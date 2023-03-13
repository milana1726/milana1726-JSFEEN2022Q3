import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { RouterModule, Routes } from '@angular/router';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';

const routes: Routes = [{ path: '', component: WelcomepageComponent }];

@NgModule({
  declarations: [
    WelcomepageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoModule
  ],
  exports: [
    WelcomepageComponent
  ],
})
export class PagesModule { }
