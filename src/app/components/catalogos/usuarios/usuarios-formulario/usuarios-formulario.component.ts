import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ConfigService } from 'src/app/services/config.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-formulario',
  templateUrl: './usuarios-formulario.component.html',
  styleUrls: ['./usuarios-formulario.component.css']
})
export class UsuariosFormularioComponent implements OnInit  {

  @Input() usuarioPadre:any;
  @Output() cambiarEtapa = new EventEmitter<string>();
  opcionActivo:any=[{label:'Si',value:true},{label:'No',value:false}];
  opcionGenero:any=[{label:'Mujer',value:'M'},{label:'Hombre',value:'H'}];
  listaCP:any=[];
  listaColonias:SelectItem[]=[];

  constructor(
    private _config:ConfigService,
    private _usuarios:UsuariosService
  ) {
    this.listaColonias=[
      {label:'San Marcos',value:'San Marcos'},
      {label:'San Algo',value:'San Algo'},
    ]
  }
  
  ngOnInit(): void {
    if(this.usuarioPadre.persona.id != 0){
      //this.usuarioPadre.persona.fecha_nacimiento = Date.parse(this.usuarioPadre.persona.fecha_nacimiento);
      this.usuarioPadre.persona.fecha_nacimiento = new Date(this.usuarioPadre.persona.fecha_nacimiento+'T00:00:00');
    }else{
      this.usuarioPadre.persona.fecha_nacimiento = new Date();
    }
    this.buscarCP();
  }

  buscarCP(){
    this.listaColonias = [];
    this._config.codigoPostal(this.usuarioPadre.direccion.cp).subscribe(
      data=>{
        let datos:any = data;
        this.listaCP = datos;
        if(this.listaCP.estado){
          this.usuarioPadre.direccion.estado = this.listaCP.estado.estado;
          this.usuarioPadre.direccion.municipio = this.listaCP.municipio.municipio;
          this.usuarioPadre.direccion.colonia = this.listaCP.colonias[0].asentamiento;
          this.listaColonias = this.listaCP.colonias;
        }else{
          this.usuarioPadre.direccion.estado = '';
          this.usuarioPadre.direccion.municipio = '';
          this.listaColonias = [];
        }
      },
      error=>{
        this.usuarioPadre.direccion.estado = '';
        this.usuarioPadre.direccion.municipio = '';
        this.listaColonias = [];
        console.log(error);
      }
    );
  }

  guardar(){
    this._usuarios.guardar(this.usuarioPadre).subscribe(
      data=>{
        this.cambiarEtapa.emit('vista');
      },
      error=>{
        console.log(error);
      }
    )
  }

  
    
    

}
