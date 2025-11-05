import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncomingService } from '../services/incoming.service';

@Component({
  selector: 'app-incoming',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incoming.component.html',
})
export class IncomingComponent implements OnInit {
  transactions: any[] = [];
  newTransaction = {
    product_id: 0,
    qty: 0,
    date: '',
    note: '',
  };
  loading = false;

  constructor(private incomingService: IncomingService) {}

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.incomingService.getTransactions().subscribe({
      next: (res) => (this.transactions = res),
      error: (err) => console.error('Gagal mengambil data transaksi:', err),
    });
  }

  addTransaction() {
    this.loading = true;
    this.incomingService.addTransaction(this.newTransaction).subscribe({
      next: () => {
        this.newTransaction = {
          product_id: 0,
          qty: 0,
          date: '',
          note: '',
        };
        this.fetchTransactions();
        this.loading = false;
      },
      error: (err) => {
        console.error('Gagal menambah transaksi:', err);
        this.loading = false;
      },
    });
  }
}
