import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit, OnDestroy {
  index = 0;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((parameter: Params) => {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
