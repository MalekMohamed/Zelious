import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LandingService} from '../shared/services/landing.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
    focus: any;
    focus1: any;
    @ViewChild('Subscribtion') emailField: ElementRef;
    subEmail = '';

    constructor(private landingService: LandingService) {
    }

    ngOnInit() {
    }

    emailSubscribe() {
        console.log(this.subEmail);
        this.landingService.emailsubscription(this.subEmail).then(res=> {
            this.emailField.nativeElement.value = '';
        });

    }
}
