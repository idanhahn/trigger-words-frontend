import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {CUSTOMERS} from '../mock-data/mock-customers';
import {delay, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  loading: BehaviorSubject<any> = new BehaviorSubject(true);

  constructor() { }

  getCustomers() {
    // TODO: consider a single db call
    return of(CUSTOMERS).pipe(
      delay(environment.mockDbDelay),
      map(res => {
        const customers = Object.entries(res).map(adjustCustomer);
        console.log('Simulated Customers from DB: ', customers);
        this.loading.next(false);
        return customers;
      })
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
