import {Component, OnInit} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

type UserFields = 'email' | 'password' | 'name';
type FormErrors = { [u in UserFields]: string };

@Component({
    selector: 'app-signup',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    focus;
    public newUser = false;
    public user: firebase.User;
    public registerForm: FormGroup;
    public formErrors: FormErrors = {
        'email': '',
        'password': '',
        'name': '',
    };
    public errorMessage: any;

    constructor(public usersService: UsersService,
                private afauth: AngularFireAuth, private fb: FormBuilder,) {
        this.registerForm = fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    register() {
        this.usersService.createUser(this.registerForm.value).then(res => {
            this.registerForm.reset();
        });
    }
}
