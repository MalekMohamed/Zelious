import {Injectable, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';

export interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
    name: string;
    code: string;
    lastLoginAt: number;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnInit {
    public currentUser = null;
    public showLoader = false;

    constructor(public afs: AngularFirestore,
                public afAuth: AngularFireAuth,
                public router: Router,
                public toastrService: ToastrService) {

        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.afs.doc(`users/${user.uid}`).get().subscribe(userDoc => {
                    this.currentUser = userDoc.data();
                    localStorage.setItem('user', JSON.stringify(this.currentUser));
                    this.router.navigateByUrl('/my-orders');
                    this.toastrService.success('Authentication successful.');
                });
            } else {
                this.currentUser = null;
                localStorage.clear();
                this.showLoader = false;
            }
        });
    }

    ngOnInit(): void {
    }

    SignIn(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
            this.router.navigateByUrl('/my-orders');
        }).catch((error) => {
            this.toastrService.error('Wrong Email or Password.');
        });
    }

    SignOut() {
        this.afAuth.auth.signOut().then(res => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
            this.toastrService.success('See your soon!');
        });
    }

    ForgotPassword(passwordResetEmail) {
        this.showLoader = true;
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
            this.toastrService.success('Password reset email sent, check your inbox.');
        }).catch((error) => {
            this.toastrService.error(error);
        });
    }

    isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user;
    }
}
