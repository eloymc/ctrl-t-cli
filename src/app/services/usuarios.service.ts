import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigComponent } from '../components/config/config.component';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token:any = localStorage.getItem('tk');
  url:any = "";
  


  constructor(
    private _http:HttpClient
  ) {
    let config:any = new ConfigComponent();
    this.url = config.url;
  }

  buscarUsuario(q:any){
    let header:any = new HttpHeaders()
    .set('Authorization','Bearer '+this.token);
    let params:any = new HttpParams()
    .set('q',q);
    return this._http.get(this.url+'/usuarios/buscar',{
      headers:header,
      params:params
    });
  }

  informacion(id:any){
    let header:any = new HttpHeaders()
    .set('Authorization','Bearer '+this.token);
    let params:any = new HttpParams()
    .set('id',id);
    return this._http.get(this.url+'/usuarios/informacion',{
      headers:header,
      params:params
    });
  }
  guardar(datos:any){
    let header:any = new HttpHeaders()
    .set('Authorization','Bearer '+this.token);
    return this._http.post(this.url+'/usuarios/guardar',{datos:datos},{
      headers:header
    });
  }
}
