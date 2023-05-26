import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public urlListar = 'http://127.0.0.1:4201/api/listar_clientes_filtro_admin';
  public urlInsertar = 'http://127.0.0.1:4201/api/registro_clientes_admin';
  public urlSearch = 'http://127.0.0.1:4201/api/obtener_clientes_admin/';
  public urlUpdate = 'http://127.0.0.1:4201/api/actualizar_clientes_admin/';
  public urlDelete = 'http://127.0.0.1:4201/api/eliminar_clientes_admin/';

  constructor(private http: HttpClient) { }

  listar_clientes_filtro_admin(token: string):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.get(this.urlListar, {headers: headers});
  }

  registro_clientes_admin(data: any, token: string):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.post(this.urlInsertar, data, {headers: headers});
  }

  obtener_clientes_admin(id: any, token: string):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.get(this.urlSearch + id, {headers: headers});
  }

  actualizar_clientes_admin(id:string, data: any, token: string):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.put(this.urlUpdate + id, data, {headers: headers});
  }

  eliminar_clientes_admin(id: string, token: string):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.delete(this.urlDelete + id, {headers: headers});
  }
}
