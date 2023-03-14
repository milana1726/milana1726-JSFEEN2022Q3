import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  signUpForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
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
    private router: Router) {}

  get name() {
    return this.signUpForm.get('name');
  }

  get login() {
    return this.signUpForm.get('login');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  onSubmit() {
    const userDataForm = {
      name: this.signUpForm.value.name,
      login: this.signUpForm.value.login,
      password: this.signUpForm.value.password,
    };
    this.authService.signUp(userDataForm).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.redirectToSignIn();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
     },
    })
    this.exitAlert();
  }

  exitAlert() {
    setTimeout(() => {
      this.isSuccessful = false;
      this.isSignUpFailed = false;
      this.errorMessage = '';
    }, 2000)
  }

  redirectToSignIn() {
    setTimeout(() => {
      this.router.navigate(['/auth/signin']);
      this.resetForm();
    }, 2000);
  }

  resetForm() {
    this.signUpForm.reset();
    Object.keys(this.signUpForm.controls).forEach(key => {
        this.signUpForm.get(key).setErrors(null) ;
    });
  }
}
