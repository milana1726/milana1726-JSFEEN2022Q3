import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Keys } from '../../models/enums/key-enum';
import { UrlEnum } from '../../models/enums/url-enum';
import { RequestBuilderService } from '../request-builder/request-builder.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private requestBuilderService: RequestBuilderService,
    private storageService: StorageService) { }

  getUserLogin() {
    const token = this.storageService.getFromStorage(Keys.TOKEN_KEY);
    const decoded: any = jwtDecode(token);
    return decoded.login;
  }

  getUserId() {
    const token = this.storageService.getFromStorage(Keys.TOKEN_KEY);
    const decoded: any = jwtDecode(token);
    return decoded.login;
  }

  getCurrentUser() {
    const token = this.storageService.getFromStorage(Keys.TOKEN_KEY);
    const decoded: any = jwtDecode(token);
    const userId: any = decoded.userId;
    return this.requestBuilderService.get(UrlEnum.baseURL + UrlEnum.users + '/' + userId);
  }
}
