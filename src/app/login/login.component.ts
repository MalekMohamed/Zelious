import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    focus;
    public newUser = false;
    public user: firebase.User;
    public loginForm: FormGroup;
    public formErrors: FormErrors = {
        'email': '',
        'password': ''
    };
    public errorMessage: any;

    constructor(public authService: AuthService,
                private afauth: AngularFireAuth, private fb: FormBuilder,) {
        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    loginTest(user) {
        this.loginForm.setValue({email: `user${user}@mailinator.com`, password: '12345678'});
        this.login();
    }

    login() {
        this.authService.SignIn(this.loginForm.value['email'], this.loginForm.value['password']);
    }
}
