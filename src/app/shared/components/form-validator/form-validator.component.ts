import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-validator',
  templateUrl: './form-validator.component.html',
  styleUrls: ['./form-validator.component.scss']
})
export class FormValidatorComponent implements OnInit, OnChanges {

  constructor() {

  }

  @Input()
  label: string = '';

  @Input()
  control!: FormControl;

  @Input()
  value!: any;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

}
