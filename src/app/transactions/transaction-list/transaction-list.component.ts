import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})

export class TransactionListComponent {
  // transactions = [
  //   { type: 'First transaction', amount: 'food' },
  //   { type: 'Second transaction', amount: 'food' },
  //   { type: 'Third transaction', amount: 'food' }
  // ];

  @Input() transactions = [];
}
