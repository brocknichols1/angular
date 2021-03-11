import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment.prod';

export interface Organization {
  organizations: any;
  id: number;
  name: string;
  details: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  private accessToken: string | undefined;
  private headers: Headers | undefined;
  baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    public auth: AuthenticationService,
    private router: Router, ) {
    this.init();
  }

  async init() {
    this.accessToken = await this.auth.getToken();
    this.headers = new Headers({
      Authorization: 'Bearer ' + this.accessToken
    });
  }

  getOrganizations(): Observable<Organization> {
    const base = this.http.get(
      this.baseUrl + '/api/public/index.php/organizations',
      {headers: {'Content-Type': 'application/json'}}
    );

    return base.pipe(
      map((data: Organization | any) => {
        return data.organizations;
      })
    );

  }

}

export class OrganizationDetails {
  public id: number | undefined;
  public name: string | undefined;
  public details: string | undefined;
}
