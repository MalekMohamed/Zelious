import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {OrdersService} from '../shared/services/orders.service';
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
    @ViewChild('orderLink') link: ElementRef;
    public Order: any = {link: '', qty: 1, note: ''};
    client;

    constructor(private router: Router, private orders: OrdersService) {
        this.client = JSON.parse(localStorage.getItem('user'));
        if (!localStorage.getItem('user')) {
            this.router.navigateByUrl('/login');
        }
    }

    ngOnInit() {
    }

    addOrder() {
        this.Order.client = this.client;
        this.Order.createdAt = formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en-US');
        this.orders.createOrder(this.Order).then(res => {
            this.link.nativeElement.value = '';
        });
        console.log(this.client.name + 'Ordered: ', this.Order);
    }
}
