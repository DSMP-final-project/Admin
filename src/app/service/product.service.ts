import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = 'http://localhost:8083/api/v1/products'

  constructor(private readonly http: HttpClient) {
  }

  getAllProducts(page: number, size: number, searchText: any): Observable<any> {

    let params = new HttpParams();

    params = params.append('searchText', searchText);
    params = params.append('page', page);
    params = params.append('size', size);

    return this.http.get(`${this.baseUrl}/visitor/list`, {withCredentials: true, params: params})
  }
}
