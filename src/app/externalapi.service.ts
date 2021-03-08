import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExternalapiService {

  constructor(private httpClient: HttpClient) { }
  public getFeedback() {
    return this.httpClient.get('http://brocknichols.xyz/sample/');
  }
}
