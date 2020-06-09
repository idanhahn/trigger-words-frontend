import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-customers-list-item',
  templateUrl: './customers-list-item.component.html',
  styleUrls: ['./customers-list-item.component.css']
})
export class CustomersListItemComponent implements OnInit {

  @Input() customer;

  constructor() { }

  ngOnInit() {
  }

}
