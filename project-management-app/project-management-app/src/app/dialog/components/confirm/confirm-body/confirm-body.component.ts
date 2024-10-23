import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-body',
  templateUrl: './confirm-body.component.html',
  styleUrls: ['./confirm-body.component.scss']
})
export class ConfirmBodyComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      message: string;
      confirmText: string;
      cancelText: string
  }) { }
}
