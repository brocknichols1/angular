import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment.prod';

export interface User {
  users: any;
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
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

  // getUsers(): Observable<User> {
  //   const base = this.http.get(
  //     this.baseUrl + '/api/users',
  //     {headers: {'Content-Type': 'application/json'}}
  //   );
  //
  //
  //   return base.pipe(
  //     map((data: User) => {
  //       return data.users;
  //     })
  //   );
  //
  // }

}
