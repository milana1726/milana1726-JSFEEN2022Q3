import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  index = 0;
  private subs: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subs = this.route.params.subscribe((parameter: Params) => {
      if (parameter['tab'] === 'signin') {
        this.index = 0;
      } else if (parameter['tab'] === 'signup') {
        this.index = 1;
      }
    });
  }

  onTabChanged(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.router.navigate(['/auth/signin']);
        break;
      case 1:
        this.router.navigate(['/auth/signup']);
        break;
    }
  }
}
