import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {

  public email = "";
  public password = "";
  

  constructor(
    private _login:LoginService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    let token:any = localStorage.getItem('tk'); 
    if(token){
      this._router.navigate(['/home']);
    }
  }

  onSubmit(f: NgForm) {
    this.email = f.value.email;
    this.password = f.value.password;
    this.login();
  }

  login(){
    this._login.login(this.email,this.password).subscribe(
      data=>{
        let datos:any = data;
        console.log(data);
        if(!datos.user.activo){
          return;
        }
        localStorage.setItem('tk',datos.access_token);
        localStorage.setItem('n',datos.user.id);
        localStorage.setItem('usuario',datos.user.name);
        localStorage.setItem('email',datos.user.email);
        this._router.navigate(['/home']);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
