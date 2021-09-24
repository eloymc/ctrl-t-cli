export interface PersonaInterface {
    id:number;
    nombre:String;
    apellido_p:String;
    apellido_m:String;
    fecha_nacimiento:Date;
    genero:String;
}

export class PersonaModel implements PersonaInterface{
    constructor(
        public id:number,
        public nombre:String,
        public apellido_p:String,
        public apellido_m:String,
        public fecha_nacimiento:Date,
        public genero:String
    ){}
    
}
