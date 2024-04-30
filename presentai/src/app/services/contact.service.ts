import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(public http: HttpClient) {}

  addContact(email: string, message: string): Observable<any> {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this.http.post(
      environment.apiUrl + '/api/add-contact',
      { email: email, message: message, timezone: timezone },
      { headers: this.httpHeaders },
    );
  }

  addNotify(email: string): Observable<any> {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this.http.post(
      environment.apiUrl + '/api/add-notify-list',
      { email: email, timezone: timezone },
      { headers: this.httpHeaders },
    );
  }
}
