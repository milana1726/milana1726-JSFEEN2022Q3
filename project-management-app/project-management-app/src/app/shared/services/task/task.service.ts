import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlEnum } from '../../models/enums/url-enum';
import { TaskBodyRequest, CreateTaskRequest, Task, UpdateTaskBody, UpdateTaskRequest } from '../../models/interfaces/board-interface';
import { RequestBuilderService } from '../request-builder/request-builder.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private requestBuilderService: RequestBuilderService) { }

  public getAllTasks(boardId: string, columnId: string): Observable<Task[]> {
    const url =
      UrlEnum.baseURL +
      UrlEnum.boards +
      `/${boardId}/` +
      UrlEnum.columns +
      `/${columnId}/` +
      UrlEnum.tasks;
    return this.requestBuilderService.get<Task[]>(url);
  }

  public createTask(boardId: string, columnId: string, data: TaskBodyRequest): Observable<CreateTaskRequest> {
    const url =
      UrlEnum.baseURL +
      UrlEnum.boards +
      `/${boardId}/` +
      UrlEnum.columns +
      `/${columnId}/` +
      UrlEnum.tasks;
    return this.requestBuilderService.post<CreateTaskRequest>(url, data);
  }

  public getTaskById(boardId: string, columnId: string, taskId: string): Observable<Task> {
    const url =
      UrlEnum.baseURL +
      UrlEnum.boards +
      `/${boardId}/` +
      UrlEnum.columns +
      `/${columnId}/` +
      UrlEnum.tasks +
      `/${taskId}`;
    return this.requestBuilderService.get<Task>(url);
  }

  public deleteTask(boardId: string, columnId: string, taskId: string): Observable<unknown> {
    const url =
      UrlEnum.baseURL +
      UrlEnum.boards +
      `/${boardId}/` +
      UrlEnum.columns +
      `/${columnId}/` +
      UrlEnum.tasks +
      `/${taskId}`;
    return this.requestBuilderService.delete<unknown>(url);
  }

  public updateTask(boardId: string, columnId: string, taskId: string, data: UpdateTaskBody): Observable<UpdateTaskRequest> {
    const url =
      UrlEnum.baseURL +
      UrlEnum.boards +
      `/${boardId}/` +
      UrlEnum.columns +
      `/${columnId}/` +
      UrlEnum.tasks +
      `/${taskId}`;
    return this.requestBuilderService.put<UpdateTaskRequest>(url, data);
  }
}
