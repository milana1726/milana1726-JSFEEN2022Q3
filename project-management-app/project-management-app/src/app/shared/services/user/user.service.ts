import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Keys } from '../../models/enums/key-enum';
import { UrlEnum } from '../../models/enums/url-enum';
import { UserData, UserBodyRequest } from '../../models/interfaces/user-interface';
import { RequestBuilderService } from '../request-builder/request-builder.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private requestBuilderService: RequestBuilderService,
    private storageService: StorageService) { }

  getUserId() {
    const token = this.storageService.getFromStorage(Keys.TOKEN_KEY);
    const decoded: any = jwtDecode(token);
    return decoded.id;
  }

  getUserLogin() {
    return this.storageService.getFromStorage(Keys.USER_LOGIN);
  }

  getCurrentUser(): Observable<UserBodyRequest> {
    const token = this.storageService.getFromStorage(Keys.TOKEN_KEY);
    const decoded: any = jwtDecode(token);
    const id: any = decoded.id;
    return this.requestBuilderService.get(`${UrlEnum.baseURL}${UrlEnum.users}/${id}`);
  }

  setCurrentUserToProfile() {
    this.getCurrentUser().subscribe((data: any) => {
      const login: any = document.getElementById('user-name');
      login.innerHTML = data.name;
    });
  }

  updateUser(id: string, data: UserBodyRequest): Observable<UserData> {
    const url = `${UrlEnum.baseURL}${UrlEnum.users}/${id}`;
    return this.requestBuilderService.put<UserData>(url, data);
  }

  deleteUser(id: string) {
    return this.requestBuilderService.delete(`${UrlEnum.baseURL}${UrlEnum.users}/${id}`);
  }

}
