import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuppliersService } from '../services/suppliers.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers.component.html',
})
export class SuppliersPage implements OnInit {
  suppliers: any[] = [];
  newSupplier = {
    name: '',
    contact: '',
    address: '',
  };
  loading = false;

  constructor(private suppliersService: SuppliersService) {}

  ngOnInit() {
    this.fetchSuppliers();
  }

  fetchSuppliers() {
    this.suppliersService.getSuppliers().subscribe({
      next: (res) => (this.suppliers = res),
      error: (err) => console.error('Gagal mengambil supplier:', err),
    });
  }

  addSupplier() {
    this.loading = true;
    this.suppliersService.addSupplier(this.newSupplier).subscribe({
      next: () => {
        this.newSupplier = { name: '', contact: '', address: '' };
        this.fetchSuppliers();
        this.loading = false;
      },
      error: (err) => {
        console.error('Gagal menambah supplier:', err);
        this.loading = false;
      },
    });
  }

  deleteSupplier(id: number) {
    if (!confirm('Yakin ingin menghapus supplier ini?')) return;

    this.suppliersService.deleteSupplier(id).subscribe({
      next: () => this.fetchSuppliers(),
      error: (err) => console.error('Gagal menghapus supplier:', err),
    });
  }
}
