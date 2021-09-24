import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ctrl-t-cli';
  constructor(
    private _router:Router
  ) {
    let token:any = localStorage.getItem('tk'); 
    if(token){
      this._router.navigate(['/home']);
    }else{
      this._router.navigate(['/login']);
    }
  }
}
