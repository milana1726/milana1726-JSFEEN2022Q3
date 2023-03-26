import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignInData } from '../../models/interfaces/auth-interface';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage/storage.service';

export const TOKEN_KEY = 'auth-token';
export const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class SignInService implements OnDestroy {
  subscription: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) { }

  signIn(userData: SignInData) {
    this.subscription.push(this.authService.signIn(userData).subscribe({
      next: (data) => {
        this.storageService.saveInStorage(TOKEN_KEY, data.token);
        this.storageService.saveInStorage(USER_KEY, JSON.stringify(data));
        this.router.navigate(['/']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }
}
