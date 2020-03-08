import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class LandingService {
    constructor(public db: AngularFirestore,
                public toaster: ToastrService
    ) {
    }

    emailsubscription(email) {
        return this.db.collection('subscriptions').doc('emails').set(
            {
                emails: firebase.firestore.FieldValue.arrayUnion(email)
            }, {merge: true}).then(res => {
            this.toaster.success('You have subscribed to our Newsletter successfully');
        });
    }
    contact(values) {
        return this.db.collection('messages').add(values).then(res => {
            this.toaster.success('Your message has been sent successfully');
        });
    }

}
