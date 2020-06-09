import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CUSTOMERS} from '../mock-data/mock-customers';
import {delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor() { }

  getCustomers() {
    return of(CUSTOMERS).pipe(
      map(res => {

        let obj = Object.entries(res);
        let customers = obj.map(adjustCustomer);
        return customers;
      }),
      delay(3000)
    );
  }
}

function adjustCustomer(obj) {

  let customer = obj[1];

  // extract id
  customer.id = obj[0];

  // assign number of chats
  customer.numOfChats = +Object.keys(obj[1].chats).length;
  // assign number of feedback
  customer.numOfFeedback = +Object.keys(obj[1].feedback).length;

  return customer;
};
