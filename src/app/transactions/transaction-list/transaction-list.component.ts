import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})

export class TransactionListComponent {
  // transactions = [
  //   { title: 'First transaction', content: 'food' },
  //   { title: 'Second transaction', content: 'food' },
  //   { title: 'Third transaction', content: 'food' }
  // ];

  transactions = [];
}
