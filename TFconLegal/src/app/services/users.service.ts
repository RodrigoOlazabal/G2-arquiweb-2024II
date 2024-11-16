import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Users } from '../models/Users';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = `${base_url}/users`;
  private listaCambio = new Subject<Users[]>();
  constructor(private http: HttpClient) { }

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Users[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(use: Users) {
    //return this.http.post(this.url, use);
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, use,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Users>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(id: number, u: Users) {
    let token = sessionStorage.getItem('token');

    return this.http.put(`${this.url}/${id}`, u,{
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

}
