import { REGEX, USER_ROLE } from './../../const/variable';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SysUserService } from '../services/sys-user.service';
import { SysUser } from 'src/app/model/sys-user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  isShow: boolean = false;
  isInvalid: boolean = false;

  userRole = USER_ROLE;

  constructor(
    private fb: FormBuilder,
    private sysUserService: SysUserService,
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.maxLength(255), Validators.pattern(REGEX.EMAIL_PATTERN)]],
      password: [null, [Validators.required, Validators.maxLength(255), Validators.pattern(REGEX.PASSWORD_PATTERN)]],
      role: [0, [Validators.required]],
    });
  }

  get form() {
    return this.signupForm.controls;
  }

  getformControl(formControlName: string): FormControl {
    return this.signupForm.get(formControlName) as FormControl;
  }

  onSubmit() {
    this.checkValid();

    const body = this.setBodyRequest();
    console.log(body);

    if (!this.isInvalid) {
      this.sysUserService.signup(body).subscribe((data: SysUser) => {
        console.log(data);
      });
    }
  }

  checkValid(): boolean {
    return true;
  }

  setBodyRequest(): object {
    return {
      username: this.form['username'].value,
      password: this.form['password'].value,
      role: this.form['role'].value,
    };
  }

  onToggleShowPassword(): void {
    this.isShow = !this.isShow;
    console.log(this.form);
  }
}
