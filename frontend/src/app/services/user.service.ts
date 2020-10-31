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

    return this.httpClient.get(environment.server + "users/" + id, httpOptions);
  }

  post(user: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    return this.httpClient.post(environment.server + "users", user, httpOptions);
  }

  put(id: number, user: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };

    return this.httpClient.put(environment.server + "users/" + id, user, httpOptions);
  }

  delete(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };

    return this.httpClient.delete(environment.server + "users/" + id, httpOptions);
  }
}
