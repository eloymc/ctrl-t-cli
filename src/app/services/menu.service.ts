import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigComponent } from '../components/config/config.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url = "";
  private token:any;

  constructor(
    private _http: HttpClient
  ) {
    let config = new ConfigComponent();
    this.url = config.url;
    this.token = localStorage.getItem('tk');
  }

  menuCompleto(){
    let header = new HttpHeaders()
    .set('Authorization','Bearer '+this.token); 
    let usuario:any = localStorage.getItem('n');
    let params = new HttpParams()
    .set('usuario',usuario);
    return this._http.get(this.url+'/menu/completo',{
      headers:header,
      params:params
    });
  }


}
