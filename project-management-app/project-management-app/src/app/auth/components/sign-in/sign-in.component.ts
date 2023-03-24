import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Keys } from 'src/app/shared/models/enums/key-enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {
  hide = true;
  isSignInFailed = false;
  isSuccessful = false;
  errorMessage = '';

  signInForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) {}

  get login() {
    return this.signInForm.get('login');
  }

  get password() {
    return this.signInForm.get('password');
  }

  onSubmit(): void {
    const userData = {
      login: this.signInForm.value.login?.trim(),
      password: this.signInForm.value.password,
    };

    this.authService.signIn(userData).subscribe({
      next: (data) => {
        this.storageService.saveInStorage(Keys.TOKEN_KEY, data.token);
        this.storageService.saveInStorage(Keys.USER_KEY, JSON.stringify(data));
        this.isSuccessful = true;
        this.redirectToMain();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignInFailed = true;
      }
    });
    this.exitAlert();
  }

  exitAlert() {
    setTimeout(() => {
      this.isSuccessful = false;
      this.isSignInFailed = false;
      this.errorMessage = '';
    }, 3000)
  }

  redirectToMain() {
    setTimeout(() => {
      this.router.navigate(['/main']);
      this.resetForm();
    }, 1500);
  }

  resetForm() {
    this.signInForm.reset();
    Object.keys(this.signInForm.controls).forEach(key => {
        this.signInForm.get(key).setErrors(null) ;
    });
  }
}

