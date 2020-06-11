import { Component, OnInit } from '@angular/core';
import {CustomersService} from './customers.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customer;
  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.children[0].params.pipe(
      switchMap(params => this.customersService.getCustomer(params.id)))
      .subscribe(customer => this.customer = customer);
  }
}
