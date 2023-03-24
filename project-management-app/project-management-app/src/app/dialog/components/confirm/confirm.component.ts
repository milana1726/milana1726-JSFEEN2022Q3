import { Component, EventEmitter, Output} from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { ConfirmBodyComponent } from './confirm-body/confirm-body.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  isDeleteBoard: boolean;
  @Output() emitConfirm: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialogService: DialogService) {
    this.isDeleteBoard = this.dialogService.isShowDeleteBoard();
  }

  openConfirmDialog() {
    this.dialogService.openDialog(ConfirmBodyComponent).subscribe((result) => {
      this.emitConfirm.emit(result);
    });
  }

}
