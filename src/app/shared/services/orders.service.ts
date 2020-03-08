import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(public db: AngularFirestore,
                public toaster: ToastrService
    ) {
    }

    createOrder(data) {
        return this.db.collection('orders').add(data).then(res => {
            this.toaster.success('Order has been placed');
        });
    }

    updateOrder(id, value) {
        return this.db.collection('orders').doc(id).set(value);
    }

    getOrdersByClient(client) {
        return this.db.collection('orders', ref => ref.where('client', '==', client)).snapshotChanges().pipe(
            map(x => x.map(y => {
                return {
                    id: y.payload.doc.id,
                    ...y.payload.doc.data()
                };
            }))
        );
    }

    getOrders() {
        return this.db.collection('orders').snapshotChanges().pipe(
            map(x => x.map(y => {
                return {
                    id: y.payload.doc.id,
                    ...y.payload.doc.data()
                };
            }))
        );
    }

    deleteOrder(id) {
        return this.db.collection('orders').doc(id).delete();
    }
}
