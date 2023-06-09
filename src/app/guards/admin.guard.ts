import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _loginService: LoginService, private _router: Router) {}

  canActivate(): any {
    if (!this._loginService.isAuthenticated(['admin'])) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
