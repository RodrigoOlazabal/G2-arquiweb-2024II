export class Users{
    id: number = 0
    username:String=""
    password:String=""
    enabled:Boolean=false
    nombres:String=""
    apellidos:String=""
    genero:String=""
    email:String=""
    dni:String=""
    celular:String=""
    fechaRegistro: Date= new Date(Date.now()) 
}