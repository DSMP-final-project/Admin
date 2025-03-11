import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = 'http://localhost:8083/api/v1/products'
  private readonly imageUrl = "http://localhost:8083/api/v1/product-images";

  constructor(private readonly http: HttpClient) {
  }

  getAllProducts(page: number, size: number, searchText: any): Observable<any> {

    let params = new HttpParams();

    params = params.append('searchText', searchText);
    params = params.append('page', page);
    params = params.append('size', size);

    return this.http.get(`${this.baseUrl}/visitor/list`, {withCredentials: true, params: params})
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  saveProduct(obj: any): Observable<any> {
    return this.http.post(this.baseUrl, {
      qty: obj.qty,
      unitPrice: obj.unitPrice,
      description: obj.description,
      productName:obj.productName,
      discount:obj.discount
    });
  }

  updateProduct(id: any, obj: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, {
      qty: obj.qty,
      unitPrice: obj.unitPrice,
      description: obj.description,
      productName:obj.productName,
      discount:obj.discount
    });
  }

  getProduct(id:any):Observable<any>{
    return this.http.get(this.baseUrl+'/visitor/'+id,id)
  }

  productImageUpload(data: FormData, productId: any): Observable<any> {
    return this.http.post(this.imageUrl + '/' + productId, data);
  }

  productImageUpdate(data: FormData, imageId: any): Observable<any> {
    return this.http.put(this.imageUrl + '/' + imageId, data);
  }

  productImageDelete(imageId:any):Observable<any>{
    return this.http.delete(this.imageUrl+'/'+imageId)
  }
}
