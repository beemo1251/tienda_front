import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { Usuario } from '../models/usuario.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://127.0.0.1:4201/api/login_admin';

  constructor(private http: HttpClient) { }

  login_admin(data: User):Observable<Usuario> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Usuario>(this.url, data, {headers: headers}).pipe(map((val: any) => {return val}));
  }

  public isAuthenticated (allowRoles: string[]):boolean {
    const token = sessionStorage.getItem('token')??'';
    const helper = new JwtHelperService();
    var decodedToken = helper.decodeToken(token);

    if (!token) {
      return false;
    }

    try {
      if (!decodedToken) {
        sessionStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('token');
      return false;
    }

    return allowRoles.includes(decodedToken['role']);
  }
}
