import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  hide = true;

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

  constructor() {}

  get login() {
    return this.signInForm.get('login');
  }

  get password() {
    return this.signInForm.get('password');
  }

  onSubmit() {}
}
