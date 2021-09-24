import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-usuarios-vista',
  templateUrl: './usuarios-vista.component.html',
  styleUrls: ['./usuarios-vista.component.css']
})
export class UsuariosVistaComponent implements OnInit {

  @Input() usuarioPadre:any;
  

  constructor() {
    
  }

  ngOnInit(): void {
    this.usuarioPadre.persona.edad = 0;
    if(this.usuarioPadre.persona.fecha_nacimiento){
      this.usuarioPadre.persona.edad = moment().diff(this.usuarioPadre.persona.fecha_nacimiento, 'years');
    }
  }

  

}
