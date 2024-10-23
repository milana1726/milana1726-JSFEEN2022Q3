import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UrlEnum } from '../../models/enums/url-enum';
import { Column } from '../../models/interfaces/board-interface';
import { RequestBuilderService } from '../request-builder/request-builder.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(private requestBuilderService: RequestBuilderService) {}

  public getAllColumns(boardId: string): Observable<Column[]> {
    const url = `${UrlEnum.baseURL}${UrlEnum.boards}/${boardId}/${UrlEnum.columns}`;
    return this.requestBuilderService.get<Column[]>(url);
  }

  public createColumn(boardId: string, data: { title: string }): Observable<Column> {
    const url = `${UrlEnum.baseURL}${UrlEnum.boards}/${boardId}/${UrlEnum.columns}`;
    return this.requestBuilderService.post<Column>(url, data);
  }

  public deleteColumn(boardId: string, columnId: string): Observable<unknown> {
    const url = `${UrlEnum.baseURL}${UrlEnum.boards}/${boardId}/${UrlEnum.columns}/${columnId}`;
    return this.requestBuilderService.delete<unknown>(url);
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    data: {
      title: string;
      order: number;
    }
  ): Observable<Column> {
    const url = `${UrlEnum.baseURL}${UrlEnum.boards}/${boardId}/${UrlEnum.columns}/${columnId}`;
    return this.requestBuilderService.put<Column>(url, data);
  }
}
