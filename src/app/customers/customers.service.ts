import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {CUSTOMERS} from '../mock-data/mock-customers';
import {delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor() { }

  getCustomers() {
    // TODO: consider a single db call
    return of(CUSTOMERS).pipe(
      map(res => {
        const customers = Object.entries(res).map(adjustCustomer);
        console.log('Simulated Customers from DB: ', customers);
        return customers;
      }),
      delay(0)
    );
  }

  getCustomer(id: string) {

    return this.getCustomers().pipe(
      map( customers => customers.find(customer => id === customer.id))
    );
  }

}

function adjustCustomer(obj) {

  const customer = obj[1];

  // extract id
  customer.id = obj[0];

  // assign number of chats
  customer.numOfChats = +Object.keys(obj[1].chats).length;

  // assign number of feedback
  customer.numOfFeedback = +Object.keys(obj[1].feedback).length;

  return customer;
}
