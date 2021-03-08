import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {Token} from "@angular/compiler";
import {environment} from "../environments/environment.prod";

export interface UserDetails {
  organization: any;
  address: any;
  profile: any;
  user: object;
  id: number;
  username: string;
  title: string;
  email: string;
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  password: string;
  exp: number;
  iat: number;
  organization_id: number;
  created_at: any;
}

export interface TokenResponse {
  token: string;
}

export interface OrgPayload {
  id: number;
  name: string;
  details: string;
}

export interface MailPayload {
  email: string;
  subject: string;
  message: string;
}

export interface TokenPayload {
  id: number;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
    localStorage.setItem("usertoken", token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("usertoken");
    }
    return this.token;
  }

  private getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.http.post(this.baseUrl + "/api/register", user, {
      headers: {"Content-Type": "application/json"}
    });
  }

  public sendEmail(email: MailPayload): Observable<any> {
    return this.http.post(this.baseUrl + "/api/email", email, {
      headers: {"Content-Type": "application/json"}
    });
  }

  public addOrg(org: OrgPayload): Observable<any> {
    return this.http.post(this.baseUrl + "/api/organizations/store", org, {
      headers: {"Content-Type": "application/json"}
    });
  }

  // public login(user: TokenPayload): Observable<any> {
  //   const base = this.http.post(
  //     this.baseUrl + "/api/login",
  //     {
  //       email: user.email,
  //       password: user.password,
  //     },
  //     {headers: {"Content-Type": "application/json"}}
  //   );
  //
  //   const request = base.pipe(
  //     map((data: TokenResponse) => {
  //       if (data.token) {
  //         this.saveToken(data.token);
  //       }
  //       return data;
  //     })
  //   );
  //
  //   return request;
  //
  // }

  public profile(): Observable<any> {
    return this.http.get(this.baseUrl + "/api/profile", {
      headers: {Authorization: "Bearer " + this.getToken()}
    });
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("usertoken");
    this.router.navigateByUrl("/")
  }

}
