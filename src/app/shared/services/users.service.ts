import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    currentUser;

    constructor(public db: AngularFirestore,
                public afAuth: AngularFireAuth,
                public toaster: ToastrService
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.db.doc(`users/${user.uid}`).get().subscribe(userDoc => {
                    this.currentUser = userDoc.data();
                    localStorage.setItem('user', JSON.stringify(this.currentUser));
                    // this.router.navigate(['/customers/show']);
                    // this.toaster.success('Authentication successful.');
                });
            } else {
                this.currentUser = null;
                localStorage.clear();
            }
        });
    }

    async createUser(value) {
        const ref = this.db.collection('users');
        return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
            .then(function (userData) {
                ref.doc(userData.user.uid).set({
                    uid: userData.user.uid,
                    email: value.email,
                    name: value.name || null,
                });
                return true;
            }).catch(function (err) {
                if (err.code === 'auth/weak-password') {
                    alert('The password is too weak.');
                } else if (err.code === 'auth/email-already-in-use') {
                    alert('This email is already in use.');
                } else if (err.code === 'auth/invalid-email') {
                    alert('email address is not valid.');
                } else {
                    alert(err.message);
                }
                return false;
            }).then(res => {
                this.toaster.success('User Created, you will be redirected shortly');
                console.log('User Created', res);
            });
    }

    updateUser(userKey, value) {
        value.userType = 'user';
        return this.db.collection('users').doc(userKey).set(value);
    }

// ToDo Search in everywhere
    searchUsers(searchValue) {
        return this.db.collection('users', ref => ref.where('name', '>=', searchValue)
            .where('name', '<=', searchValue + '\uf8ff')
            .where('userType', '==', 'user'))
            .snapshotChanges();
    }

    getUser(userKey) {
        return this.db.collection('users').doc(userKey).snapshotChanges();
    }

    getUsers() {
        return this.db.collection('users').snapshotChanges().pipe(
            map(x => x.map(y => {
                return {
                    uid: y.payload.doc.id,
                    ...y.payload.doc.data()
                };
            }))
        );
    }

    deleteUser(contactKey) {
        return this.db.collection('users').doc(contactKey).delete();
    }
}
