import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidatorComponent } from './components/form-validator/form-validator.component';
import { NgSelectModule } from '@ng-select/ng-select';


const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  NgSelectModule
];

const COMPONENTS = [
  FormValidatorComponent
];

@NgModule({
  declarations: [
    FormValidatorComponent
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ]
})
export class SharedModule { }
