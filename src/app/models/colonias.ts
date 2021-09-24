export interface ColoniasInterface {
    asentamiento:String,
    tipoAsentamiento:String
}

export class ColoniasModel implements ColoniasInterface{
    constructor(
        public asentamiento:String,
        public tipoAsentamiento:String
    ){}
}
