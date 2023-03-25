import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(component: ComponentType<any>): Observable<boolean> {
    return this.dialog.open(component, {
      width: "25rem",
      disableClose: true
    }).afterClosed();
  }
}
