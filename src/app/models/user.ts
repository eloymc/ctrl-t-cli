import { DireccionModel } from "./direccion";
import { PersonaModel } from "./persona";
import { TelefonoModel } from "./telefono";

export interface UserInterface {
    id: number;
    name: String;
    email:String;
    password:String;
    activo:boolean;
    persona:PersonaModel;
    direccion:DireccionModel;
    telefono_1:TelefonoModel;
    telefono_2:TelefonoModel;
}

export class UserModel implements UserInterface{
    constructor(
        public id: number, 
        public name: String, 
        public email: String, 
        public password: String,
        public activo: boolean,
        public persona: PersonaModel,
        public direccion: DireccionModel,
        public telefono_1: TelefonoModel,
        public telefono_2: TelefonoModel,
    ) {
        
    }
}
