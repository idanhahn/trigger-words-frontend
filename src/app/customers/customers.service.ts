import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CUSTOMERS} from '../mock-data/mock-customers';
import {delay, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {Customer} from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  loading: BehaviorSubject<any> = new BehaviorSubject(true);
  doneLoading = false;


  constructor(private firestore: AngularFirestore) { }

  // TODO: combine duplicate code
  getCustomers(): Observable<any> {

    if (environment.useMockDB) {
      // TODO: consider a single db call
      if (this.doneLoading) {
        return of(CUSTOMERS).pipe(
          map(res => {
            const customers = Object.entries(res).map(adjustCustomer);
            console.log('Snapshot Simulated Customers from DB: ', customers);
            return customers;
          })
        );
      } else {
        return of(CUSTOMERS).pipe(
          delay(environment.mockLoadingDelay),
          map(res => {
            const customers = Object.entries(res).map(adjustCustomer);
            console.log('Simulated Customers from DB: ', customers);
            this.loading.next(false);
            this.doneLoading = true;
            return customers;
          })
        );
      }
    } else {
      if (this.doneLoading) {

        return this.firestore.collection('customers').valueChanges().pipe(
          tap(customers => {
            console.log('Live Customers from DB: ', customers);
          })
        );

      } else {

        return this.firestore.collection('customers').valueChanges().pipe(
          delay(environment.mockLoadingDelay),
          tap(customers => {
            console.log('Live Customers from DB: ', customers);
            this.loading.next(false);
            this.doneLoading = true;
          })
        );
      }
    }
  }

  getCustomer(id: string) {

    if (this.doneLoading) {
      return this.firestore.collection('customers').doc<Customer>(id).valueChanges();
    } else {
      return this.firestore.collection('customers').doc<Customer>(id).valueChanges().pipe(
        delay(environment.mockLoadingDelay),
        tap(res => {
          this.loading.next(false);
          this.doneLoading = true;
        })
      );
    }

  }

  getAllChats(id) {
    if (environment.useMockDB){

      return this.getCustomers().pipe(
        map( customers => customers.find(customer => id === customer.id)),
        map(customer => {
          console.log(customer);
          const chats = Object.values(customer.chats);
          console.log(chats);
          return chats;
        })
      );
    } else {
      return this.firestore.collection('customers').doc(id).collection('chats').valueChanges();
    }
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
