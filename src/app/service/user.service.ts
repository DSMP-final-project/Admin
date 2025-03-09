import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8083/login";

  constructor(private http: HttpClient) { }

  login(obj: any): Observable<any> {
    return this.http.post(this.url,
      {
      password: obj.password,
      email: obj.email
    },
      {
      observe: 'response',
      withCredentials: true
    })}
}
