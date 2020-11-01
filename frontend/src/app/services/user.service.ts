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
        'Content-Type': 'application/json'
      }),
      params: {
        page,
        sortColumn,
        sortDirection
      }
    };

    return this.httpClient.get(`${environment.users_server}users`, httpOptions);
  }


  get(id: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.get(`${environment.users_server}users/${id}`, httpOptions);
  }

  post(user: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(`${environment.users_server}users`, user, httpOptions);
  }

  put(id: number, user: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.put(`${environment.users_server}users/${id}`, user, httpOptions);
  }

  delete(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.delete(`${environment.users_server}users/${id}`, httpOptions);
  }
}
