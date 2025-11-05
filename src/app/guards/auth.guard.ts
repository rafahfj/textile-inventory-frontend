import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Ambil cookie user_info
  const cookies = document.cookie.split(';').map(c => c.trim());
  const userInfoCookie = cookies.find(c => c.startsWith('user_info='));

  if (!userInfoCookie) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const value = decodeURIComponent(userInfoCookie.split('=')[1]);
    const user = JSON.parse(value);
    localStorage.setItem('info', JSON.stringify(user))
    console.log('✅ AuthGuard User:', user);

    // validasi minimal
    if (user.email && user.role) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }

  } catch (err) {
    console.error('❌ Invalid user_info cookie:', err);
    router.navigate(['/login']);
    return false;
  }
};
