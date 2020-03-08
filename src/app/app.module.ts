import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {LandingComponent} from './landing/landing.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {OrderModule} from './order/order.module';
import {LoginComponent} from './login/login.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LandingComponent,
        MyOrdersComponent,
        NavbarComponent,
        FooterComponent,
        LoginComponent
    ],
    imports: [
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        OrderModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
