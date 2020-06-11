import {Component, Input, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {CustomersService} from '../customers/customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers$;

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.customers$ = this.customersService.getCustomers();
  }

}
