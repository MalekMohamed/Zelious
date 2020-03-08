import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../shared/services/orders.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.scss']
})

export class MyOrdersComponent implements OnInit {
    myOrders: any = [];
    client;

    constructor(private router: Router, private orders: OrdersService) {
        if (!localStorage.getItem('user')) {
            this.router.navigateByUrl('/login');
        }
        this.client = JSON.parse(localStorage.getItem('user'));
        this.orders.getOrdersByClient(this.client).subscribe(res => {
            this.myOrders = res;
            console.log(res);
        });
    }

    ngOnInit() {
    }

}
