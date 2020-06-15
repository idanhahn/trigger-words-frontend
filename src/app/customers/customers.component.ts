import { Component, OnInit } from '@angular/core';
import {CustomersService} from './customers.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Customer} from './customer';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [
    // List Animation:
    // ---------------
    trigger('startAppList', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('0.8s 0.5s cubic-bezier(0.33, 1, 0.68, 1)', style({
          transform: 'translateX(0)'
        }))
      ])
    ]),
    // Detail Panel Animation:
    // -----------------------
    trigger('startAppDetails',[
      transition(':enter',[
        style({
          opacity: 0
        }),
        animate('0.8s 0.5s cubic-bezier(0.64, 0, 0.78, 0)', style({
          opacity: 1
        }))
      ])
    ]),
    // Loader Animation:
    // -----------------
    trigger('startAppLoader', [
      transition(':leave',[
        style({
          opacity: 1
        }),
        animate('0.5s 0s ease-in', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class CustomersComponent implements OnInit {

  customer: Customer;
  loading = true;

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.children[0].params.pipe(
      switchMap(params => this.customersService.getCustomer(params.id)))
      .subscribe(customer => this.customer = customer);

    this.customersService.loading.subscribe(
      loading => this.loading = loading
    );
  }
}
