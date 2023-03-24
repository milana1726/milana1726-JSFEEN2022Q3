import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

@Component({
  selector: 'app-confirm-body',
  templateUrl: './confirm-body.component.html',
  styleUrls: ['./confirm-body.component.scss']
})
export class ConfirmBodyComponent {
  isDeleteBoard: boolean;

  constructor(
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string
  }) {
    this.isDeleteBoard = this.dialogService.isShowDeleteBoard();
  }
}
