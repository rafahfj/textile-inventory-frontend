import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OutgoingService } from '../services/outgoing.service';

@Component({
  selector: 'app-outgoing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './outgoing.component.html',
})
export class OutgoingComponent implements OnInit {
  transactions: any[] = [];
  newTransaction = {
    product_id: 0,
    qty: 0,
    date: '',
    note: '',
  };
  loading = false;

  constructor(private outgoingService: OutgoingService) {}

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.outgoingService.getTransactions().subscribe({
      next: (res) => ((this.transactions = res), res),
      error: (err) => console.error('Gagal mengambil data transaksi:', err),
    });
  }

  addTransaction() {
    this.loading = true;
    this.outgoingService.addTransaction(this.newTransaction).subscribe({
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
