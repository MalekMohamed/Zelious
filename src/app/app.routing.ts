import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {OrderComponent} from './order/order.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {RegisterComponent} from './register/register.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
    {path: 'order', component: OrderComponent},
    {path: 'my-orders', component: MyOrdersComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'landing', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'landing', pathMatch: 'full'}
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
