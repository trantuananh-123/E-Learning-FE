import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SysUser } from 'src/app/model/sys-user.model';
import { DetailResponseData } from 'src/app/model/response/detail-response-data.model';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SpinnerSerivce } from 'src/app/shared/services/spinner.service';
import { Router } from '@angular/router';
import { REGEX, USER_ROLE } from 'src/app/const/variable';
import { SysUserService } from 'src/app/core/services/sys-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  isShow: boolean = false;
  isInvalid: boolean = false;
  submitted: boolean = false;
  isExist: boolean = false;

  userRole = USER_ROLE;

  constructor(
    private fb: FormBuilder,
    private sysUserService: SysUserService,
    private toastr: ToastrService,
    private spinner: SpinnerSerivce,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    // this.spinner.show();
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern(REGEX.USERNAME_PATTERN)]],
      email: [null, [Validators.required, Validators.maxLength(255), Validators.pattern(REGEX.EMAIL_PATTERN)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern(REGEX.PASSWORD_PATTERN)]],
      role: [0, [Validators.required]],
    });
  }

  get form() {
    return this.signupForm.controls;
  }

  getFormControl(formControlName: string): FormControl {
    return this.signupForm.get(formControlName) as FormControl;
  }

  onSubmit() {
    this.submitted = true;
    this.checkValid();

    if (!this.isInvalid) {
      this.spinner.show();
      const body = this.setBodyRequest();
      this.sysUserService.signup(body).subscribe({
        next: (data: DetailResponseData<SysUser>) => {
          if (data.status == HttpStatusCode.Created) {
            this.toastr.success('SignUp successfully', 'Sign up');
            this.router.navigate(["/user/sign-in"]);
          } else if (data.status == HttpStatusCode.Conflict) {
            this.toastr.error('User exists with same username', 'Sign up');
            this.isExist = true;
          } else {
            this.toastr.error('Sign up failed', 'Sign up');
          }
        },
        error: (data: DetailResponseData<SysUser>) => {
          this.toastr.error('Sign up failed', 'Sign up');
        },
        complete: () => {
          this.submitted = false;
          this.spinner.hide();
        }
      }), () => {
        this.spinner.hide();
      };
    }
  }

  checkValid(): boolean {
    if (this.form['username'].errors?.['required']) {
      this.toastr.warning('Username is required', 'Sign up');
      this.isInvalid = true;
    } else if (this.form['username'].errors?.['pattern']) {
      this.toastr.warning('Username is invalid', 'Sign up');
      this.isInvalid = true;
    } else if (this.form['email'].errors?.['required']) {
      this.toastr.warning('Email is required', 'Sign up');
      this.isInvalid = true;
    } else if (this.form['email'].errors?.['pattern']) {
      this.toastr.warning('Email is invalid', 'Sign up');
      this.isInvalid = true;
    } else if (this.form['password'].errors?.['required']) {
      this.toastr.warning('Password is required', 'Sign up');
      this.isInvalid = true;
    } else if (this.form['password'].errors?.['pattern']) {
      this.toastr.warning('Password is invalid', 'Sign up');
      this.isInvalid = true;
    } else {
      this.isInvalid = false;
    }
    return this.isInvalid;
  }

  setBodyRequest(): object {
    return {
      username: this.form['username'].value,
      email: this.form['email'].value,
      password: this.form['password'].value,
      role: this.form['role'].value,
    };
  }

  onToggleShowPassword(): void {
    this.isShow = !this.isShow;
  }
}
