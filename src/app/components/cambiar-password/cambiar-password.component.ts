import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  password:String = "";
  confirmar:String = "";
  email:any = "";

  constructor(
    private _usuarios:UsuariosService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
  }

  verificar(){
    if(this.password == ''){
      return;
    }
    if(this.confirmar == ''){
      return;
    }
    if(this.confirmar != this.password){
      return;
    }
    this._usuarios.cambiarPassword(this.email,this.password).subscribe(
      data=>{
        localStorage.clear();
        this._router.navigate(['/login']);
      },
      error=>{
        console.log(error);
      }
    );

  }

}
