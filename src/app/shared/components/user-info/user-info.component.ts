import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @ViewChild(MatMenuTrigger, { static: false }) trigger!: MatMenuTrigger;
  isInMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  open() {
    this.trigger.openMenu();
  }

  close() {
    setTimeout(() => {
      if (this.isInMenu === false) {
        this.trigger.closeMenu();
      }
    }, 100);
  }
}
