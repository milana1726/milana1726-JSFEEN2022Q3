import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalBodyComponent } from './modal-body/modal-body.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() emitText: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalBodyComponent, {
      width: '25rem',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.emitText.emit(result);
    });
  }
}
