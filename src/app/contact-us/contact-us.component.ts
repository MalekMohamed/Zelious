import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {LandingService} from '../shared/services/landing.service';

type UserFields = 'email' | 'message' | 'name';
type FormErrors = { [u in UserFields]: string };

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    focus: any;
    focus1: any;
    public contactForm: FormGroup;
    public formErrors: FormErrors = {
        'email': '',
        'message': '',
        'name': '',
    };
    public errorMessage: any;

    constructor(private landingService: LandingService, fb: FormBuilder) {
        this.contactForm = fb.group({
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    sendMessage() {
        this.landingService.contact(this.contactForm.value).then(res => {
            this.contactForm.reset();
        });
    }
}
