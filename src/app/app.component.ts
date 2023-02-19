import { NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-learning';

  isShowHeader: boolean = false;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'].includes('sign-in') || event['url'].includes('sign-up')) {
          this.isShowHeader = false;
        } else {
          this.isShowHeader = true;
        }
      }
    });
  }
}
