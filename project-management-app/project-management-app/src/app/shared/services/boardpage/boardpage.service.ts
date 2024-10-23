import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Keys } from '../../models/enums/key-enum';
import { AllTasks, Column, ColumnBodyRequest, CreateColumnEvent, CreateTaskEvent, Task, TaskBodyRequest } from '../../models/interfaces/board-interface';
import { ColumnService } from '../column/column.service';
import { StorageService } from '../storage/storage.service';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class BoardpageService implements OnDestroy{


  private allColumns$ = new BehaviorSubject<Column[]>([]);
  public allTasks$ = new BehaviorSubject<AllTasks>({ columnId: '', tasks: [] });

  errorMessage = '';
  subscription: Subscription[] = [];

  constructor(
    private columnService: ColumnService,
    private storageService: StorageService,
    private userService: UserService,
    private taskService: TaskService) { }

  public getAllColumns$() {
    return this.allColumns$.asObservable();
  }

  public getAllTasks$() {
    return this.allTasks$.asObservable();
  }

  getAllColumn() {
    const boardId = this.storageService.getFromStorage(Keys.BOARD_ID);
    this.subscription.push(this.columnService.getAllColumns(boardId).subscribe({
      next: (data: Column[]) => {
        this.allColumns$.next(data);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    }));
  }

  getBoardTitle() {
    return this.storageService.getFromStorage(Keys.BOARD_TITLE);
  }

  createColumn(event: CreateColumnEvent) {

    const newColumn: ColumnBodyRequest = {
      title: event.value.title,
      order: 0
    }
    const boardId = this.storageService.getFromStorage(Keys.BOARD_ID);

    this.subscription.push(this.columnService
      .createColumn(boardId, newColumn)
      .subscribe({
        next: () => {
          this.columnService.getAllColumns(boardId).subscribe({
            next: (item: Column[]) => {
              this.allColumns$.next(item);
            },
            error: (err) => {
              this.errorMessage = err.error.message;
              console.log(this.errorMessage);
            },
          });
        },
      }));
  }

  deleteColumn(columnId: string) {
    const boardId = this.storageService.getFromStorage(Keys.BOARD_ID);

    this.subscription.push(this.columnService.deleteColumn(boardId, columnId).subscribe({
      next: () => {
        this.columnService.getAllColumns(boardId).subscribe({
          next: (item: Column[]) => {
            this.allColumns$.next(item);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            console.log(this.errorMessage);
          },
        });
      },
    }));
  }

  getAllTasksColumn(columnId: string) {
    const boardId = this.storageService.getFromStorage(Keys.BOARD_ID);

    this.subscription.push(
      this.taskService.getAllTasks(boardId, columnId).subscribe({
      next: (tasks: Task[]) => {
        this.allTasks$.next({ columnId, tasks });
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    }));
  }

  createTask(event: CreateTaskEvent, columnId: string) {
    const boardId = this.storageService.getFromStorage(Keys.BOARD_ID);
    const userId = this.userService.getUserId();

    const newTask: TaskBodyRequest = {
      title: event.value.title,
      order: 0,
      description: event.value.description,
      userId: userId,
      users: []
    }

    this.subscription.push(this.taskService
      .createTask(boardId, columnId, newTask).subscribe({
        next: () => {
          this.taskService.getAllTasks(boardId, columnId).subscribe({
            next: (tasks: Task[]) => {
              this.allTasks$.next({ columnId, tasks });
            },
            error: (err) => {
              this.errorMessage = err.error.message;
              console.log(this.errorMessage);
            },
          });
        },
      }));
    }

    deleteTask(boardId: string, columnId: string, taskId: string) {
      this.subscription.push(this.taskService.deleteTask(boardId, columnId, taskId).subscribe({
        next: () => {
          this.taskService.getAllTasks(boardId, columnId).subscribe({
            next: (tasks: Task[]) => {
              this.allTasks$.next({ columnId, tasks });
            },
            error: (err) => {
              this.errorMessage = err.error.message;
              console.log(this.errorMessage);
            },
          });
        },
      }));
    }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }
}

