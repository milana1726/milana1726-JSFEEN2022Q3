import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { RouterModule, Routes } from '@angular/router';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { GuestGuard } from '../shared/guards/guest/guest.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: WelcomepageComponent, canActivate: [GuestGuard], },
  { path: 'main', component: MainpageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    WelcomepageComponent,
    MainpageComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoModule
  ],
  exports: [
    WelcomepageComponent,
    MainpageComponent,
    NotFoundComponent
  ],
})
export class PagesModule { }
