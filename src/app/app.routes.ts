import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundPage } from './not-found/not-found.component';
import { LogedinLayout } from './logedin-layout/logedin-layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginPage),
        title: 'Login - Textile Inventory',
      },
    ],
  },
  {
    path: '',
    component: LogedinLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardPage
          ),
        title: 'Dashboard - Textile Inventory',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/products.component').then((m) => m.ProductsPage),
        title: 'Products - Textile Inventory',
      },
      {
        path: 'suppliers',
        loadComponent: () =>
          import('./suppliers/suppliers.component').then(
            (m) => m.SuppliersPage
          ),
        title: 'Suppliers - Textile Inventory',
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.component').then((m) => m.UsersPage),
        title: 'Users - Textile Inventory',
      },
      {
        path: 'transactions',
        children: [
          {
            path: 'incoming',
            loadComponent: () =>
              import('./incoming/incoming.component').then(
                (m) => m.IncomingComponent
              ),
            title: 'Incoming Transactions - Textile Inventory',
          },
          {
            path: 'outgoing',
            loadComponent: () =>
              import('./outgoing/outgoing.component').then(
                (m) => m.OutgoingComponent
              ),
            title: 'Outgoing Transactions - Textile Inventory',
          },
        ],
      },
    ],
  },

  {
    path: '**',
    component: NotFoundPage,
    title: 'Not Found - Textile Inventory',
  },
];
