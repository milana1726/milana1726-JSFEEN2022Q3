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


@NgModule({
  declarations: [
    ModalComponent,
    ModalBodyComponent
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
    ModalBodyComponent
  ],
})
export class DialogModule { }
