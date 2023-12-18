import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PubmedService {
  public httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(public http: HttpClient) { }

  searchPubmed(query:string): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/search-pubmed', { query:query }, { headers: this.httpHeaders});
  }

  downloadFile(work_id: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/download-file', {filename: work_id+'.xlsx' }, { headers: this.httpHeaders, responseType: 'blob' as 'json' });
  }
}
