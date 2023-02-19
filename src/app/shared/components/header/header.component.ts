import { Component, OnInit } from '@angular/core';
import { SysMenuResponseDTO } from 'src/app/model/dto/sys-menu-response.dto';
import { ListResponseData } from 'src/app/model/response/list-response-data.model';
import { SysMenuService } from '../../services/sys-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuList: Array<SysMenuResponseDTO> = [];

  constructor(
    private sysMenuService: SysMenuService,
  ) {

  }
  ngOnInit(): void {
    this.sysMenuService.getALl().subscribe({
      next: (data: ListResponseData<Array<SysMenuResponseDTO>>) => {
        this.menuList = data.data;
      }
    });

  }
}