import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(page: string = '', sortColumn: string = '', sortDirection: string = ''): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
      params: {
        page,
        sortColumn,
        sortDirection
      }
    };

    return this.httpClient.get(environment.server + "users", httpOptions);
  }


  get(id: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };

    return this.httpClient.get(environment.server + "customers/" + id, httpOptions);
  }

  post(customer: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    return this.httpClient.post(environment.server + "customers", customer, httpOptions);
  }

  patch(id: number, customer: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };

    console.log('customer', customer);
    return this.httpClient.patch(environment.server + "customers/" + id, customer, httpOptions);
  }

  checkCode(code: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }),
    }

    return this.httpClient.get(environment.server + "customers/bycode/" + code, httpOptions)
  }

  delete(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };

    return this.httpClient.delete(environment.server + "customers/" + id, httpOptions);
  }
}
