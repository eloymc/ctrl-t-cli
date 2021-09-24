import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router:Router
  ) {
    let token:any = localStorage.getItem('tk'); 
    let pass_temp:any = localStorage.getItem('pass_temp'); 
    if(!token){
      this._router.navigate(['/index']);
    }
    if(pass_temp != 'false'){
      this._router.navigate(['/cambiar-password']);
    }
  }

  ngOnInit(): void {
  }

}
