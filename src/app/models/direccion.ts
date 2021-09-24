export interface DireccionInterface {
    id:number;
    calle:String;
    no_ext:String;
    no_int:String;
    colonia:String;
    municipio:String;
    estado:String;
    pais:String;
    cp:String;
    referencia:String;
}

export class DireccionModel implements DireccionInterface{
    constructor(
        public id:number,
        public calle:String,
        public no_ext:String,
        public no_int:String,
        public colonia:String,
        public municipio:String,
        public estado:String,
        public pais:String,
        public cp:String,
        public referencia:String
    ){}
}
