import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';

import {OrderComponent} from './order.component';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule
    ],
    declarations: [OrderComponent],
    exports: [OrderComponent],
    providers: []
})
export class OrderModule {
}
