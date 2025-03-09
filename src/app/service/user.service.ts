import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:8083";

  constructor(private readonly http: HttpClient) {
  }

  login(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`,
      {
        password: obj.password,
        email: obj.email
      },
      {
        observe: 'response',
        withCredentials: true
      })
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/logout`, {withCredentials: true});
  }
}
