import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UserModel } from '../../../models/user';
import { PersonaInterface, PersonaModel } from '../../../models/persona';
import { DireccionInterface, DireccionModel } from '../../../models/direccion';
import { TelefonoInterface, TelefonoModel } from '../../../models/telefono';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  items: MenuItem[] = [];
  radius: any= 120;
  usuarioSelect: any = [];
  resultadoBusqueda: any = [];
  usuarioInformacion:UserModel;
  etapa:any = null;
  enviandoPassword:boolean = false;

  constructor(
    private _usuario:UsuariosService,
    private messageService: MessageService
  ) {
    let fecha:Date=new Date();
    let persona:PersonaInterface = new PersonaModel(
      0,'','','',fecha,''
    );
    let direccion:DireccionInterface = new DireccionModel(
      0,'','','','','','','','',''
    );
    let telefono1:TelefonoInterface = new TelefonoModel(
      0,'',''
    );
    let telefono2:TelefonoInterface = new TelefonoModel(
      0,'',''
    );
    this.usuarioInformacion={
      id:0,
      name:'',
      email:'',
      password:'',
      activo:true,
      persona:persona,
      direccion:direccion,
      telefono_1:telefono1,
      telefono_2:telefono2,
      pass_temp:false
    };
  }

  ngOnInit(): void {
    
  }

  busqueda(e:any){
    this._usuario.buscarUsuario(e.query).subscribe(
      data=>{
        let datos:any = data;
        this.resultadoBusqueda = datos;
      },
      error=>{
        console.log(error);
      }
    )
  }

  reiniciarModel(){
    let fecha:Date=new Date();
    let persona:PersonaInterface = new PersonaModel(
      0,'','','',fecha,''
    );
    let direccion:DireccionInterface = new DireccionModel(
      0,'','','','','','','','',''
    );
    let telefono1:TelefonoInterface = new TelefonoModel(
      0,'',''
    );
    let telefono2:TelefonoInterface = new TelefonoModel(
      0,'',''
    );
    this.usuarioInformacion={
      id:0,
      name:'',
      email:'',
      password:'',
      activo:true,
      persona:persona,
      direccion:direccion,
      telefono_1:telefono1,
      telefono_2:telefono2,
      pass_temp:false
    };
  }

  informacion(){
    if(this.usuarioSelect.id == this.usuarioInformacion.id){
      return;
    }
    this.etapa = null;
    this.reiniciarModel();
    this._usuario.informacion(this.usuarioSelect.id).subscribe(
      data=>{
        let datos:any=data;
        this.usuarioInformacion.id = datos.id;
        this.usuarioInformacion.name = datos.name;
        this.usuarioInformacion.email = datos.email;
        this.usuarioInformacion.activo = datos.activo;
        if(datos.persona != null){
          this.usuarioInformacion.persona.id = datos.persona.id;
          this.usuarioInformacion.persona.nombre = datos.persona.nombre;
          this.usuarioInformacion.persona.apellido_p = datos.persona.apellido_p;
          this.usuarioInformacion.persona.apellido_m = datos.persona.apellido_m;
          this.usuarioInformacion.persona.fecha_nacimiento = datos.persona.fecha_nacimiento;
          this.usuarioInformacion.persona.genero = datos.persona.genero;
        }
        if(datos.direccion != null){
          this.usuarioInformacion.direccion.id = datos.direccion.id;
          this.usuarioInformacion.direccion.calle = datos.direccion.calle;
          this.usuarioInformacion.direccion.no_ext = datos.direccion.no_ext;
          this.usuarioInformacion.direccion.no_int = datos.direccion.no_int;
          this.usuarioInformacion.direccion.colonia = datos.direccion.colonia;
          this.usuarioInformacion.direccion.municipio = datos.direccion.municipio;
          this.usuarioInformacion.direccion.estado = datos.direccion.estado;
          this.usuarioInformacion.direccion.pais = datos.direccion.pais;
          this.usuarioInformacion.direccion.cp = datos.direccion.cp;
          this.usuarioInformacion.direccion.referencia = datos.direccion.referencia;
        }
        if(datos.telefono_1 != null){
          this.usuarioInformacion.telefono_1.id = datos.telefono_1.id;
          this.usuarioInformacion.telefono_1.numero = datos.telefono_1.numero;
          this.usuarioInformacion.telefono_1.tipo = datos.telefono_1.tipo;
        }
        if(datos.telefono_2 != null){
          this.usuarioInformacion.telefono_2.id = datos.telefono_2.id;
          this.usuarioInformacion.telefono_2.numero = datos.telefono_2.numero;
          this.usuarioInformacion.telefono_2.tipo = datos.telefono_2.tipo;
        }
        
        this.etapa = 'vista';
      },
      error=>{
        console.log(error);
      }
    );
  }
  cambiarEtapa(e:any){
    this.etapa = e;
  }

  abrirFormularioNuevo(){
    this.usuarioSelect = [];
    this.reiniciarModel();
    this.etapa = 'formulario';
  }

  solicitarReinicioPassword(){
    this.enviandoPassword = true;
    this._usuario.reiniciarPassword(this.usuarioInformacion.email).subscribe(
      data=>{
        if(data == "Correo enviado"){
          this.messageService.add({severity:'success', summary:'Listo! ', detail:'El correo fue enviado'});
          this.enviandoPassword = false;
        }else{
          this.messageService.add({severity:'error', summary:'Ups! ', detail:'Hubo un error al enviar el correo'});
          this.enviandoPassword = false;
        }
      },
      error=>{
        console.log(error);
        this.messageService.add({severity:'error', summary:'Ups! ', detail:'Hubo un error al enviar el correo'});
        this.enviandoPassword = false;
      }
    );
  }
}
