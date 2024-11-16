import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { MetodoPago } from '../models/MetodoPago';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosXmetPago } from '../models/CantUserXmetPago';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MeotodoPagoService {

  private url = `${base_url}/MetodoPago`;  //misma ruta del backend
  private listaCambio = new Subject<MetodoPago[]>();
  constructor(private http: HttpClient) {}


  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<MetodoPago[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(metPa: MetodoPago) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, metPa, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: MetodoPago[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<MetodoPago>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
  update(m: MetodoPago) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, m,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getCanUsuariosXmetPago():Observable<UsuariosXmetPago[]>{
    let token = sessionStorage.getItem('token');

    return this.http.get<UsuariosXmetPago[]>(`${this.url}/CantidadUsersXtipo`,{
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }

}
