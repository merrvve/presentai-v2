import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { iSlide } from '../models/iSlide.interface';

@Injectable({
  providedIn: 'root',
})
export class TextToPptxService {
  public httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(public http: HttpClient) {}

  createSlides(text: string, tool: number): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/create-slides',
      { text: text, tool: tool },
      { headers: this.httpHeaders, responseType: 'blob' as 'json' },
    );
  }

  createSlidesWithGPT(text: string) {
    let slides = JSON.parse(text) as iSlide[];
  }

  createSlidesWithGPTautomated(text: string) {
    return this.http.post(
      environment.apiUrl + '/api/create-slides-openai',
      { text: text },
      { headers: this.httpHeaders, responseType: 'blob' as 'json' },
    );
  }
}
