import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlEnum } from '../../models/enums/url.enum';
import { SignInData, SignUpData, SignInResponse } from '../../models/interfaces/auth.interface';
import { RequestBuilderService } from '../request-builder/request-builder.service';
import { UserData } from '../../models/interfaces/user.interface';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { Keys } from '../../models/enums/key.enum';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();

  constructor(
    private requestBuilderService: RequestBuilderService,
    private router: Router,
    private storageService: StorageService) { }

  signIn(body: SignInData): Observable<SignInResponse> {
    return this.requestBuilderService.post(UrlEnum.baseURL + UrlEnum.signIn, body);
  }

  signUp(body: SignUpData): Observable<UserData> {
    return this.requestBuilderService.post(UrlEnum.baseURL + UrlEnum.signUp, body);
  }

  isSignedIn() {
    const token = this.storageService.getFromStorage(Keys.TOKEN_KEY);
    return !this.helper.isTokenExpired(token);
  }

  signOut(): void {
    this.router.navigate(['/']);
    this.storageService.clearStorage();
  }
}