import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBodyComponent } from './components/modal/modal-body/modal-body.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ConfirmBodyComponent } from './components/confirm/confirm-body/confirm-body.component';


@NgModule({
  declarations: [
    ModalComponent,
    ModalBodyComponent,
    ConfirmComponent,
    ConfirmBodyComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [
    ModalComponent,
    ModalBodyComponent,
    ConfirmComponent,
    ConfirmBodyComponent
  ],
})
export class DialogModule { }
