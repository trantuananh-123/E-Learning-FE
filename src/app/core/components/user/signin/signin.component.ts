import { enviroment } from '../../../../../../env/enviroment.demo';
import { AppStorageService } from '../../../../shared/services/app-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SysUserService } from '../../../services/sys-user.service';
import { SysUser } from 'src/app/model/sys-user.model';
import { DetailResponseData } from 'src/app/model/response/detail-response-data.model';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SpinnerSerivce } from 'src/app/shared/services/spinner.service';
import { TokenResponseDTO } from 'src/app/model/dto/token-response.dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessToken } from 'src/app/model/access-token.model';
import { firstValueFrom, lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  isShow: boolean = false;
  isInvalid: boolean = false;
  submitted: boolean = false;
  inCorrectUser: boolean = false;

  tokenResponse!: TokenResponseDTO;
  accessToken!: AccessToken;

  jwtHelperService: JwtHelperService = new JwtHelperService();

  user!: SysUser;

  constructor(
    private fb: FormBuilder,
    private sysUserService: SysUserService,
    private appStorageService: AppStorageService,
    private toastr: ToastrService,
    private spinner: SpinnerSerivce,
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signinForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  get form() {
    return this.signinForm.controls;
  }

  getFormControl(formControlName: string): FormControl {
    return this.signinForm.get(formControlName) as FormControl;
  }

  async onSubmit() {
    this.submitted = true;
    this.checkValid();

    if (!this.isInvalid) {
      this.spinner.show();
      const body = this.setBodyRequest();
      const data = await firstValueFrom(this.sysUserService.signin(body));
      if (data.status == HttpStatusCode.Ok) {
        this.toastr.success('Sign in successfully', 'Sign in');
        this.accessToken = this.jwtHelperService.decodeToken(data.data.access_token)!;
        this.accessToken.access_token = data.data.access_token;
        this.accessToken.refresh_token = data.data.refresh_token;
        this.appStorageService.saveData(enviroment.APP_STORAGE_NAME, this.accessToken, true);

        this.sysUserService.getDetail().subscribe({
          next: (data: DetailResponseData<SysUser>) => {
            console.log(data);
          },
          complete: () => {
            this.spinner.hide();
          }
        });

      } else if (data.status == HttpStatusCode.Unauthorized) {
        this.toastr.error('Incorrect username/email or password', 'Sign in');
        this.inCorrectUser = true;
      } else {
        this.toastr.error('Sign in failed', 'Sign in');
        this.inCorrectUser = true;
      }
    }
  }

  test() {
    this.user = this.sysUserService.getUserInfo()!;
    console.log(this.user);
  }

  checkValid(): boolean {
    if (this.form['username'].errors?.['required']) {
      this.toastr.warning('Username/Email is required', 'Sign in');
      this.isInvalid = true;
    } else if (this.form['password'].errors?.['required']) {
      this.toastr.warning('Password is required', 'Sign in');
      this.isInvalid = true;
    } else {
      this.isInvalid = false;
    }
    return this.isInvalid;
  }

  setBodyRequest(): object {
    return {
      username: this.form['username'].value,
      email: this.form['username'].value,
      password: this.form['password'].value
    };
  }

  onToggleShowPassword(): void {
    this.isShow = !this.isShow;
  }
}
