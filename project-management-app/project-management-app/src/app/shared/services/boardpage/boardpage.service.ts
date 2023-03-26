import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Keys } from '../../models/enums/key-enum';
import { Column, ColumnBodyRequest, CreateColumnEvent } from '../../models/interfaces/board-interface';
import { ColumnService } from '../column/column.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BoardpageService implements OnDestroy{

  private allColumns$ = new BehaviorSubject<Column[]>([]);
  errorMessage = '';
  subscription: Subscription[] = [];

  constructor(
    private columnService: ColumnService,
    private storageService: StorageService) { }

  public getAllColumns$() {
    return this.allColumns$.asObservable();
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
    console.log(boardId, columnId);

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

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }
}

