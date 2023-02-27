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
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MenuDropdownComponent } from './components/menu-dropdown/menu-dropdown.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { TextMaskModule } from 'angular2-text-mask';
import { DatepickerComponent } from './components/datepicker/datepicker.component';


const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MatNativeDateModule,
];

const EXTRA_MODULES = [
  TextMaskModule,
  NgSelectModule,
]

const MATERIAL_MODULES = [
  MatMenuModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
]

const COMPONENTS = [
  FormValidatorComponent,
  HeaderComponent,
  MenuDropdownComponent,
  UserInfoComponent,
  DatepickerComponent,
];

@NgModule({
  declarations: [
    FormValidatorComponent,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ...MODULES,
    ...EXTRA_MODULES,
    ...MATERIAL_MODULES,
  ],
  exports: [
    ...MODULES,
    ...EXTRA_MODULES,
    ...MATERIAL_MODULES,
    ...COMPONENTS,
  ]
})
export class SharedModule { }
