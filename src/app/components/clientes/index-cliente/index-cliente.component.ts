import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes : Array<any> = [];
  public clMemory : Array<any> = [];
  public cliente: any = {};
  public filtro_nombre = '';
  public filtro_correo = '';
  public page = 1;
  public pageSize = 10;
  public token = '';
  public load_data = true;

  constructor(private _clienteService: ClienteService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')??'';
    this.init_data();
  }

  init_data() {
    this._clienteService.listar_clientes_filtro_admin(this.token).subscribe(
      resp => {
        this.clientes = resp.data;
        this.clMemory = this.clientes;
        this.load_data = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  filtrar(tipo: string) {
    this.clientes = this.clMemory;
    if (tipo == 'nombre') {
      this.clientes = this.clientes.filter(a =>  (a.nombres.toLowerCase() + ' ' + a.apellidos.toLowerCase()).includes(this.filtro_nombre));
    }
    if (tipo == 'correo') {
      this.clientes = this.clientes.filter(a => a.mail.includes(this.filtro_correo));
    }
  }

  selectCliente(item: any) {
    this.cliente = item;
  }

  eliminar() {
    this._clienteService.eliminar_clientes_admin(this.cliente._id, this.token).subscribe(
      resp => {
        iziToast.show({
          title: 'BIEN',
          icon: 'ico-success',
          color: 'green',
          overlayColor: 'rgba(0, 0, 0, .6)',
          class: 'text-success',
          position: 'topRight',
          message: 'Se eliminó correctamente'
        });
        this.init_data();
      }
    )
  }

}
