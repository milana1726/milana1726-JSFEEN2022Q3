import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { ModalBodyComponent } from './modal-body/modal-body.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() emitText: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService
    ) {}

  openModalDialog(): void {
    this.dialogService.openDialog(ModalBodyComponent).subscribe((result) => {
      this.emitText.emit(result);
    });
  }
}
