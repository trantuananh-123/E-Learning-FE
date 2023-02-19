import { SysMenuResponseDTO } from './../../../model/dto/sys-menu-response.dto';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss']
})
export class MenuDropdownComponent {

  @Input() item!: SysMenuResponseDTO;
  @Input() isRootMenu!: boolean;
  childrenMenu: any;

}
