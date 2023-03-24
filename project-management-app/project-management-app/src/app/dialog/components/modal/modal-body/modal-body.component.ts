import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.scss']
})

export class ModalBodyComponent implements OnInit {
  public createForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string }
  ) {}

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
