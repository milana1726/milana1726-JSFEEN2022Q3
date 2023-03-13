import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  activeLang: string;
  constructor(private translate: TranslocoService) {}

  ngOnInit() {
    this.activeLang = 'en';
  }

  changeLang(lang: string) {
    this.translate.setActiveLang(lang);
    this.activeLang = lang;
  }


}
