import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly baseUrl = 'http://localhost:8083/api/v1/customer';

  constructor(private readonly http: HttpClient) {
  }

  getAllCustomers(size: number, page: number, searchText: number): Observable<any> {

    let params = new HttpParams();

    params = params.append("searchText", searchText);
    params = params.append("page", page);
    params = params.append("size", size);

    return this.http.get(`${this.baseUrl}/list`, {withCredentials: true, params: params});
  }
}
