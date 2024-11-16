import { Users } from "./Users"

export class Suscripcion{
    idSuscripcion: number=0
    fechaInicio: Date=new Date(Date.now())
    fechaFin: Date=new Date(Date.now())
    tipoSuscripcion: String=""
    precio: number=0.0
    user:Users=new Users()
  }