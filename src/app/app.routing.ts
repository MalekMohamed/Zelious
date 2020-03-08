import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {OrderComponent} from './order/order.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {RegisterComponent} from './register/register.component';
import {LandingComponent} from './landing/landing.component';
import {ReturnPolicyComponent} from './return-policy/return-policy.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsComponent} from './terms/terms.component';
import {LoginComponent} from './login/login.component';
import {ContactUsComponent} from './contact-us/contact-us.component';

const routes: Routes = [
    {path: 'order', component: OrderComponent},
    {path: 'my-orders', component: MyOrdersComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'return-policy', component: ReturnPolicyComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'terms', component: TermsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'contact-us', component: ContactUsComponent},
    {path: '', pathMatch: 'full', component: LandingComponent}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
