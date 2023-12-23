import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { iLog } from '../models/iLog.interface';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  public httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(public http: HttpClient) { }

  addLog(detailId: number, clickId: number) {
    let log: iLog = {
      clickId: clickId,
      detailId: detailId,
      location: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    return this.http.post(environment.apiUrl + '/api/add-log', log, { headers: this.httpHeaders }).subscribe(result=>console.log(result),error=>console.log(error));
  }
}
