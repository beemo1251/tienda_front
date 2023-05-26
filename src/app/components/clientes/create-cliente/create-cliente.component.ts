import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente: any = { genero: '' }
  public token = '';
  public load_btn = false;

  constructor(private _clienteService: ClienteService, private _router: Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')??'';
  }

  registro(registroForm: NgForm) {
    this.load_btn = true;
    if (registroForm.valid) {
      this._clienteService.registro_clientes_admin(this.cliente, this.token).subscribe(
        resp => {
          iziToast.show({
            title: 'BIEN',
            icon: 'ico-success',
            color: 'green',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro correctamente'
          });

          this.limpiarForm();
          this._router.navigate(['/panel/clientes']);
          this.load_btn = false;
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
          });
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
