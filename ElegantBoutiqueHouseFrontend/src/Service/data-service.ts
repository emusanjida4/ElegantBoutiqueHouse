import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environment/environment.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl: string='';
  constructor(private http: HttpClient) {
    this.apiUrl = new Environment().apiUrl;
  }
  GetData(url:string) {
   return this.http.get(this.apiUrl + url)
  }
  postData(url:string, data:any) {
    return this.http.post(this.apiUrl + url, data);
  }
}
