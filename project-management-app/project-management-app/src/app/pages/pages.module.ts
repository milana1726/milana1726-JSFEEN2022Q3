import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule, Routes } from '@angular/router';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { AuthGuard } from '../shared/guards/auth/auth.guard';
import { GuestGuard } from '../shared/guards/guest/guest.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BoardsListComponent } from './components/mainpage/components/boards-list/boards-list.component';
import { SearchBarComponent } from './components/mainpage/components/search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from "../dialog/dialog.module";
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { BoardComponent } from './components/board/board.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: WelcomepageComponent, canActivate: [GuestGuard], },
  { path: 'main', component: MainpageComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
];

@NgModule({
    declarations: [
        WelcomepageComponent,
        MainpageComponent,
        NotFoundComponent,
        BoardsListComponent,
        SearchBarComponent,
        EditProfileComponent,
        BoardComponent,
    ],
    exports: [
        WelcomepageComponent,
        MainpageComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslocoModule,
        MatIconModule,
        MatButtonModule,
        DialogModule,
        FormsModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class PagesModule { }
