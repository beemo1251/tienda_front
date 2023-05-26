import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //PRODUCTO
  public urlInsert = 'http://127.0.0.1:4201/api/registro_producto_admin/';
  public urlListar = 'http://127.0.0.1:4201/api/listar_producto_admin';
  public urlObtener = 'http://127.0.0.1:4201/api/obtener_producto_admin/';
  public urlUpdate = 'http://127.0.0.1:4201/api/actualizar_producto_admin/';
  public urlDelete = 'http://127.0.0.1:4201/api/eliminar_producto_admin/';

  //INVENTARIO
  public urlList = 'http://127.0.0.1:4201/api/listar_inventario_producto_admin/';
  public urlDel = 'http://127.0.0.1:4201/api/eliminar_inventario_producto_admin/';

  constructor(private http: HttpClient) { }

  registro_producto_admin(data: any, file: File, token: string): Observable<any> {
    let headers = new HttpHeaders({'Authorization': token});
    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('descripcion', data.descripcion);
    fd.append('contenido', data.contenido);
    fd.append('categoria', data.categoria);
    fd.append('portada', file);

    return this.http.post(this.urlInsert, fd, {headers: headers});
  }

  listar_producto_admin(token: string): Observable<any> {
    let headers = new HttpHeaders({'Authorization': token});
    return this.http.get(this.urlListar, {headers: headers});
  }

  obtener_producto_admin(id: any, token: string):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.get(this.urlObtener + id, {headers: headers});
  }

  actualizar_producto_admin(data: any, id: string, token: string): Observable<any> {
    let headers = new HttpHeaders({'Authorization': token});
    if (data.portada) {
      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('stock', data.stock);
      fd.append('precio', data.precio);
      fd.append('descripcion', data.descripcion);
      fd.append('contenido', data.contenido);
      fd.append('categoria', data.categoria);
      fd.append('portada', data.portada);

      return this.http.put(this.urlUpdate + id, fd, {headers: headers});
    } else {
      return this.http.put(this.urlUpdate + id, data, {headers: headers});
    }
  }

  eliminar_producto_admin(id: string, token: string):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.delete(this.urlDelete + id, {headers: headers});
  }

  listar_inventario_prodcuto_admin(id: string, token: string):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.get(this.urlList + id, {headers: headers});
  }

  eliminar_inventario_producto_admin(id: string, token: string):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.delete(this.urlDel + id, {headers: headers});
  }
}
