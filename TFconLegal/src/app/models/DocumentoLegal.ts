import { Users } from "./Users"

export class DocumentoLegal{
    idDocumento:number=0
    tipoDocumento:String=""
    tituloDocumento:String=""
    descripcionDocumento:String=""
    urlDocumento:String=""
    fechaPublicacion: Date=new Date(Date.now())
    user:Users=new Users()
}