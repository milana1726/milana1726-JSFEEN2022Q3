import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlEnum } from '../../models/enums/url-enum';
import { Board, CreateBoardRequest } from '../../models/interfaces/board-interface';
import { RequestBuilderService } from '../request-builder/request-builder.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private requestBuilderService: RequestBuilderService,
    private userService: UserService) { }

  public getAllBoards(): Observable<Board[]> {
    const userId = this.userService.getUserId();
    return this.requestBuilderService.get<Board[]>(`${UrlEnum.baseURL}${UrlEnum.boardsSet}/${userId}`);
  }

  public createBoard(data: CreateBoardRequest): Observable<Board> {
    return this.requestBuilderService.post<Board>(`${UrlEnum.baseURL}${UrlEnum.boards}`, data);
  }

  public deleteBoard(id: string): Observable<unknown> {
    const url = `${UrlEnum.baseURL}${UrlEnum.boards}/${id}`;
    return this.requestBuilderService.delete<unknown>(url);
  }

}
