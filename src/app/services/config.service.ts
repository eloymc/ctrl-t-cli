import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigComponent } from '../components/config/config.component';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  url:any;
  token:any;
  constructor(
    private _http:HttpClient
  ) {
    let config = new ConfigComponent();
    this.url = config.url;
    this.token = localStorage.getItem('tk');
  }

  codigoPostal(cp:any){
    let header:any = new HttpHeaders()
    .set('Authorization','Bearer '+this.token); 
    let params:any = new HttpParams().set('cp',cp);
    return this._http.get(this.url+'/cp/search',{
      headers:header,
      params:params
    });
  }
}
