import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  activeLang: string;
  isSignedIn = false;

  constructor(
    private translate: TranslocoService,
    private router: Router,
    public authService: AuthService) {}

  ngOnInit() {
    this.activeLang = 'en';
  }

  changeLang(lang: string) {
    this.translate.setActiveLang(lang);
    this.activeLang = lang;
  }

  onSignOut() {
    this.authService.signOut();
  }

}
