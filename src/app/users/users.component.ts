import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
})
export class UsersPage implements OnInit {
  newUser = new FormGroup({
    username: new FormControl(''),
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });
  users: any = null;
  loading = true;
  error = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal memuat data users';
        this.loading = false;
        console.error('Error fetching users summary:', err);
      },
    });
  }

  registerUser() {
    this.usersService.registUsers(this.newUser.value).subscribe({
      next: (data) => {
        'User registered successfully:', data;
        this.ngOnInit(); // Refresh the user list
      },
      error: (err) => {
        this.error = 'Gagal mendaftarkan user';
        console.error('Error registering user:', err);
      },
    });
  }
}
