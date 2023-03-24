import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private showOneField$ = new BehaviorSubject<boolean>(true);
  private showDeleteBoard$ = new BehaviorSubject<boolean>(true);

  constructor(private dialog: MatDialog) { }

  openDialog(component: ComponentType<any>): Observable<boolean> {
    return this.dialog.open(component, {
      width: "25rem",
      disableClose: true
    }).afterClosed();
  }

  isShowOneFiled(): boolean {
    return this.showOneField$.getValue();
  }

  setOneFiled() {
    this.showOneField$.next(true);
  }

  setTwoFilds() {
    this.showOneField$.next(false);
  }

  isShowDeleteBoard(): boolean {
    return this.showDeleteBoard$.getValue();
  }

  setDeleteBoard() {
    this.showDeleteBoard$.next(true);
  }

  setDeleteUser() {
    this.showDeleteBoard$.next(false);
  }
}
