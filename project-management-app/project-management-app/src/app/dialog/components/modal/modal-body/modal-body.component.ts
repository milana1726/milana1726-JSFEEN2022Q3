import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

@Component({
  selector: 'app-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.scss']
})

export class ModalBodyComponent implements OnInit {
  public createForm!: FormGroup;
  public isShowOneField: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalBodyComponent>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string }
  ) {
    this.isShowOneField = this.dialogService.isShowOneFiled();
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: [
        '',
          [
            Validators.required,
            Validators.minLength(3),
          ],
        ],
      description: [
        '',
          [
            Validators.minLength(3),
          ],
        ],
    });
  }

  get title() {
    return this.createForm.get('title');
  }

  onSubmit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      value: form,
    });
  }
}
