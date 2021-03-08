import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload} from "../../authentication.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './adduser.component.html',
})
export class AdduserComponent {

  // Variables
  addUserForm: FormGroup;
  loading: boolean | undefined;
  errors: boolean | undefined;
  credentials = {
    id: 0,
    username: '',
    email: '',
    password: '',
    organization_id: ''
  }

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    fb: FormBuilder,
  ) {
    this.addUserForm = fb.group({
      username: [
        '',
        [Validators.required]
      ],
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

  ngOnInit(): void { }

  /**
   * Register the user based on the form values
   */
  adduser() {
    this.loading = true;
    this.errors = false;

    this.credentials = {
      id: 0,
      username: this.addUserForm.value.username,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      organization_id: '0',
    }

    this.auth.register(this.credentials).subscribe(
      (resp) => {
        location.reload();
      },
      err => {
        console.log(err)
      }
    )
  }

  /**
   * Getter for the form controls
   */
  get controls() {
    return this.addUserForm.controls;
  }

}
