import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardPage implements OnInit {
  summary: any = null;
  loading = true;
  error = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getSummary().subscribe({
      next: (data) => {
        console.log(data);
        this.summary = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal memuat data dashboard';
        this.loading = false;
        console.error('Error fetching dashboard summary:', err);
      },
    });
  }
}
