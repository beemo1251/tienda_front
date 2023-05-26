import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';

declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public _user: User = new User;
  public _usuario: Usuario = new Usuario();

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    let tokenSesion = sessionStorage.getItem('token');
    if (tokenSesion != undefined || tokenSesion != null) {
      this.router.navigate(['/']);
    }

  }

  login(loginForm: any) {
    if (loginForm.valid) {
      let data = {
        mail: this._user.mail,
        password: this._user.password
      }
      this._loginService.login_admin(data).subscribe(
        resp => {
          let obj: any = {...resp};
          if (obj.message != undefined) {
            iziToast.show({
              title: 'WARNING',
              icon: 'ico-warning',
              color: 'yellow',
              overlayColor: 'rgba(0, 0, 0, 0.6)',
              class: 'text-danger',
              position: 'topRight',
              message: obj.message
            })
          } else {
            let u = obj.data;
            this._usuario = u;
            sessionStorage.setItem('token', obj.token);
            sessionStorage.setItem('_id', u._id);

            this.router.navigate(['/']);
          }
        },
        err => {
          iziToast.show({
            title: 'ERROR',
            icon: 'ico-error',
            color: 'red',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            class: 'text-danger',
            position: 'topRight',
            message: err
          })
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        icon: 'ico-error',
        color: 'red',
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      })
    }
  }

}
