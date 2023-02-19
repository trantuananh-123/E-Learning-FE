import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidatorComponent } from './components/form-validator/form-validator.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuDropdownComponent } from './components/menu-dropdown/menu-dropdown.component';
import { UserInfoComponent } from './components/user-info/user-info.component';


const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  NgSelectModule,
  RouterModule
];

const MATERIAL_MODULES = [
  MatMenuModule,
  MatButtonModule,
  MatDialogModule,
]

const COMPONENTS = [
  FormValidatorComponent,
  HeaderComponent,
  MenuDropdownComponent,
  UserInfoComponent,
];

@NgModule({
  declarations: [
    FormValidatorComponent,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ...MODULES,
    ...MATERIAL_MODULES,
  ],
  exports: [
    ...MODULES,
    ...MATERIAL_MODULES,
    ...COMPONENTS,
  ]
})
export class SharedModule { }
