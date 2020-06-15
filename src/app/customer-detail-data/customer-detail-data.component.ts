import {Component, Input, OnInit} from '@angular/core';
import {CustomersService} from '../customers/customers.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-detail-data',
  templateUrl: './customer-detail-data.component.html',
  styleUrls: ['./customer-detail-data.component.css']
})
export class CustomerDetailDataComponent implements OnInit {

  chats;
  constructor(private customersService: CustomersService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.pipe(
      switchMap(params => this.customersService.getCustomer(params.id)),
      map(customer => {
        console.log(customer);
        const chats = Object.values(customer.chats);
        console.log(chats);
        return chats;
      })
    )
      .subscribe(chats => {
        this.chats = chats;
        console.log(this.chats);
      });
  }

}
