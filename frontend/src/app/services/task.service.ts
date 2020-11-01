import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getAll(user_id: string, status: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.get(`${environment.tasks_server}tasksbyuser/${status}/${user_id}`, httpOptions);
  }


  get(id: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.get(`${environment.tasks_server}tasks/${id}`, httpOptions);
  }

  post(user: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(`${environment.tasks_server}tasks`, user, httpOptions);
  }

  put(id: number, user: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.put(`${environment.tasks_server}tasks/${id}`, user, httpOptions);
  }

  delete(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.delete(`${environment.tasks_server}tasks/${id}`, httpOptions);
  }
}
