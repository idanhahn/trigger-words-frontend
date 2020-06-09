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
        let customers = Object.values(res);
        customers.forEach(adjustCustomer);
        return customers;
      }),
      delay(3000)
    );
  }
}

function adjustCustomer(obj) {
  // assign number of chats
  obj.numOfChats = +Object.keys(obj.chats).length;
  // assign number of feedback
  obj.numOfFeedback = +Object.keys(obj.feedback).length;
};
