import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Keys } from 'src/app/shared/models/enums/key-enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  userId = this.userService.getUserId();

  hide = true;
  isSuccessful = false;
  isEditFailed = false;
  errorMessage = '';

  editForm = new FormGroup({
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

  userDataForm = {
    name: '',
    login: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private location: Location) {}

  ngOnInit(): void {
    this.subscription = this.userService.getCurrentUser().subscribe((data)=> {
      this.userDataForm.name = data.name;
      this.userDataForm.login = data.login;

      this.name?.setValue(data.name);
      this.login?.setValue(data.login);
    })
  }

  get name() {
    return this.editForm.get('name');
  }

  get login() {
    return this.editForm.get('login');
  }

  get password() {
    return this.editForm.get('password');
  }

  onSubmit() {
    const updateDataForm = {
      name: this.editForm.value.name,
      login: this.editForm.value.login,
      password: this.editForm.value.password,
    };

    const newUserData = Object.assign(updateDataForm);

    this.userService.updateUser(this.userId, newUserData).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.storageService.saveInStorage(Keys.USER_LOGIN, data.login);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isEditFailed = true;
     },
    });
    this.exitAlert();
  }

  exitAlert() {
    setTimeout(() => {
      this.isSuccessful = false;
      this.isEditFailed = false;
      this.errorMessage = '';
      this.editForm.get('password').setValue('');
    }, 2000);
  }

  onReturn() {
    this.location.back();
  }

  setDeleteUser() {
    document.getElementById("delete-board").hidden = true;
    document.getElementById("delete-profile").hidden = false;
    document.getElementById("delete-column").hidden = true;
    document.getElementById("delete-task").hidden = true;
  }

  onDelete(event) {
    if (event) {
      this.userService.deleteUser(this.userId).subscribe({
        next: () => this.authService.signOut(),
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isEditFailed = true;
        }
      });
      this.router.navigate(['/']);
    }
    this.exitAlert();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
