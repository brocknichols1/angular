import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload} from '../authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  // Variables
  form: FormGroup;
  loading: boolean | undefined;
  errors: boolean | undefined;
  credentials: TokenPayload = {
    id: 0,
    username: '',
    email: '',
    password: '',
  };

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    fb: FormBuilder,
  ) {
    this.form = fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void { }

  /**
   * Login the user based on the form values
   */
  login(): void {
    this.loading = true;
    this.errors = false;
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/manage');
      },
      err => {
        this.errors = true;
        console.log(err);
      }
    );
  }


}
