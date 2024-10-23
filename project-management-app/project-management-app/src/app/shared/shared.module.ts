import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DialogModule } from '../dialog/dialog.module';
import { SearchPipe } from './pipes/search.pipe';
import {MatIconModule} from '@angular/material/icon';
import { StopPropagationDirective } from './directives/stop-propagation.directive';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchPipe,
        StopPropagationDirective
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        MatButtonToggleModule,
        TranslocoModule,
        RouterModule,
        DialogModule,
        MatIconModule
    ]
})
export class SharedModule { }
