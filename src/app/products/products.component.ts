import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'product-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  loading = false;

  form: Product = {
    name: '',
    type: '',
    color: '',
    unit: '',
    price: 0,
    min_stock: 0,
    current_stock: 0,
    supplier_id: 0,
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Gagal ambil data produk:', err),
    });
  }

  submitForm(): void {
    this.loading = true;
    this.productService.addProduct(this.form).subscribe({
      next: () => {
        this.form = {
          name: '',
          type: '',
          color: '',
          unit: '',
          price: 0.0,
          min_stock: 0,
          current_stock: 0,
          supplier_id: 0,
        };
        this.loadProducts();
        this.loading = false;
      },
      error: (err) => {
        console.error('Gagal menambah produk:', err);
        this.loading = false;
      },
    });
  }
}
