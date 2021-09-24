export interface TelefonoInterface {
    id:number;
    numero:String;
    tipo:String;
}

export class TelefonoModel implements TelefonoInterface{
    constructor(
        public id:number,
        public numero:String,
        public tipo:String
    ){

    }
}