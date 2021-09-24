import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigComponent } from '../components/config/config.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "";
  private token = "";

  constructor(
    private _http: HttpClient
  ) {
    let config = new ConfigComponent();
    this.url = config.url;
    this.token = config.token;
  }

  login(email:string,password:string){
    let header = new HttpHeaders();
    //header.set('Authorization',this.token);
    let params = new HttpParams()
    .set('email',email)
    .set('password',password);
    return this._http.post(this.url+'/user/login',{email:email,password:password},{
      headers:header
    });
  }
}
