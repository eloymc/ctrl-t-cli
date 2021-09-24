import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public url = "http://127.0.0.1:8000/api/v1";
  public token:any = null;

  constructor() {
    let token:any = localStorage.getItem('token');
    if(token)
    this.token = token;
  }

  ngOnInit(): void {
  }


}
