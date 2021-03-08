import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload} from '../../authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-organization',
  templateUrl: './addorganization.component.html',
})
export class AddorganizationComponent {

  // Variables
  addOrgForm: FormGroup;
  loading: boolean | undefined;
  errors: boolean | undefined;
  credentials = {
    id: 0,
    name: '',
    details: '',
  }

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    fb: FormBuilder,
  ) {
    this.addOrgForm = fb.group({
      name: [
        '',
        [Validators.required]
      ],
      details: [
        '',
        [Validators.required]
      ],
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void { }

  /**
   * Register the user based on the form values
   */
  addorg() {
    this.loading = true;
    this.errors = false;

    this.credentials = {
      id: 0,
      name: this.addOrgForm.value.name,
      details: this.addOrgForm.value.details,
    };

    this.auth.addOrg(this.credentials).subscribe(
      (resp: { status: { success: boolean; }; }) => {
        if (resp.status.success === true){
          // tslint:disable-next-line:only-arrow-functions typedef
          this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
          };
          location.reload();
        }
      },
        (err: any) => {
        this.errors = true;
        console.log(err);
      }
    );
  }

  /**
   * Getter for the form controls
   */
  // tslint:disable-next-line:typedef
  get controls() {
    return this.addOrgForm.controls;
  }

}
