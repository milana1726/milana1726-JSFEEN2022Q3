import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CreateBoardEvent } from '../../models/interfaces/board-interface';
import { AuthService } from '../../services/auth/auth.service';
import { MainpageService } from '../../services/mainpage/mainpage.service';
import { UserService } from '../../services/user/user.service';

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
    public authService: AuthService,
    public userService: UserService,
    public mainpageService: MainpageService) {}

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

  createNewBoard(event: CreateBoardEvent) {
    if (event) {
      this.mainpageService.createBoard(event);
    }
  }

}
