import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-clientes',
  templateUrl: './edit-clientes.component.html',
  styleUrls: ['./edit-clientes.component.css']
})
export class EditClientesComponent implements OnInit {

  public cliente: any = {};
  public routeId: string = '';
  public token: string = '';
  public load_btn = false;

  constructor(private _route: ActivatedRoute, private _clienteService: ClienteService, private _router: Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')??'';
    this._route.params.subscribe(
      parm => {
        this.routeId = parm['id'];

        this._clienteService.obtener_clientes_admin(this.routeId, this.token).subscribe(
          resp => {
            if (resp.data == undefined) {
              this.cliente = undefined;
            } else {
              this.cliente = resp.data;
            }
          },
          err => {
            this.cliente = undefined;
          }
        )
      }
    )
  }

  actualizar(updateForm: NgForm) {
    this.load_btn = true;
    if (updateForm.valid) {
      this._clienteService.actualizar_clientes_admin(this.routeId, this.cliente, this.token).subscribe(
        resp => {
          iziToast.show({
            title: 'BIEN',
            icon: 'ico-success',
            color: 'green',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente'
          });

          this.limpiarForm();
          this._router.navigate(['/panel/clientes']);
          this.load_btn = false;
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
      });
      this.load_btn = false;
    }
  }

  limpiarForm() {
    this.cliente = {
      genero: '',
      nombres: '',
      apellidos: '',
      mail: '',
      telefono: '',
      f_nacimiento: '',
      dni: ''
    }
  }

}
