import {NgModule, Component, TemplateRef, ViewChild} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AuthenticationService, UserDetails} from '../../authentication.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User, UsersService} from '../../users.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Organization, OrganizationDetails, OrganizationService} from '../../organization.service';
import {UserProfile, UserprofileService} from '../../userprofile.service';
import {environment} from '../../../environments/environment.prod';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  baseUrl: string = environment.apiUrl;
  loading: boolean | undefined;
  details?: UserDetails | any;
  users?: User | any;
  user?: UserProfile | any;
  rolesOptions: Array<{ id: number, role: string }> = [
    {id: 1, role: 'Admin'},
    {id: 2, role: 'User'}
  ];

  isAdmin = false;
  errors: boolean | undefined;
  successdata: any;
  closeResult: any;

  errorMessage: string | undefined;
  httpClient: any;

  profileForm: FormGroup | any;
  userForm: FormGroup | any;
  createForm: FormGroup | any;

  organizations: Organization | any;

  constructor(
    private http: HttpClient,
    public auth: AuthenticationService,
    private router: Router,
    private userService: UsersService,
    private organizationService: OrganizationService,
    public modalService: NgbModal,
    public fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        this.updateDetails(this.details);
        // @ts-ignore
        if (this.details?.user.role.user_role === 'Admin') {
          this.isAdmin = true;
        }
        this.getUsers(this.details.user.id);
      },
      err => {
        this.router.navigate(['/']);
      }
    );

    this.getOrganizations();

    this.createForm = this.fb.group({
      username: '',
      email: '',
      password: '',
      role: '',
      organization_id: '',
    });

    this.profileForm = this.fb.group({
      id: [''],
      title: '',
      organization_id: '',
      organization: '',
      role: '',
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    });

    this.userForm = this.fb.group({
      id: [''],
      title: '',
      organization_id: '',
      organization: '',
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      state: '',
      zip: '',

    });
  }

  // tslint:disable-next-line:typedef
  updateDetails(userdetail: any) {

    // @ts-ignore
    this.userForm.patchValue({
      id: userdetail.user.id,
      title: userdetail.user.profile.title,
      email: userdetail.user.email,
      organization_id: userdetail.user.organization_id,
      firstname: userdetail.user.profile.firstname,
      lastname: userdetail.user.profile.lastname,
      street: userdetail.user.address.street,
      city: userdetail.user.address.city,
      state: userdetail.user.address.state,
      zip: userdetail.user.address.zip,
    });
  }

  // tslint:disable-next-line:typedef
  openEdit(targetModal: TemplateRef<any>, user: UserProfile) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    // @ts-ignore
    this.profileForm.patchValue({
      id: user.id,
      title: user.profile?.title,
      email: user.email,
      organization_id: user.organization?.id,
      firstname: user.profile?.firstname,
      lastname: user.profile?.lastname,
      street: user.address?.street,
      city: user.address?.city,
      state: user.address?.state,
      zip: user.address?.zip,
      role: user.role?.user_role
    });
  }

  // tslint:disable-next-line:typedef
  openNewUser(targetModal: TemplateRef<any>) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    // @ts-ignore
    this.createForm.patchValue({
      username: '',
      email: '',
      password: '',
      role: '',
      organization_id: '',
    });
  }

  // tslint:disable-next-line:typedef
  createUser(data: { value: any; }) {
    const url = this.baseUrl + '/api/public/index.php/users/create';
    this.http.post(url, data.value)
      .subscribe((result) => {
        this.ngOnInit(); // reload the table
      });

    this.modalService.dismissAll(); // dismiss the modal
  }

  // tslint:disable-next-line:typedef
  onSubmit(data: { value: any; }) {
      const url = this.baseUrl + '/api/public/index.php/profile/update';
      this.http.put(url, data.value)
        .subscribe((result) => {
          this.ngOnInit(); // reload the table
        });

      this.modalService.dismissAll(); // dismiss the modal
  }

  // tslint:disable-next-line:typedef
  getUsers(id: number) {
    this.userService.getUsers(id).subscribe(
      users => {
        this.users = users;
        console.log(this.users);
      },
      error => this.errorMessage = (error as any)
    );
  }

  // tslint:disable-next-line:typedef
  getOrganizations() {
    this.organizationService.getOrganizations().subscribe(
      (organizations: any) => {
        this.organizations = organizations;
      },
      error => this.errorMessage = (error as any)
    );
  }

  // tslint:disable-next-line:typedef
  deleteUser(data: { id: string; }) {
    const deleteURL = this.baseUrl + '/api/public/index.php/users/delete/' + data.id;
    this.http.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

}
