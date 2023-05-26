import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public token: string = '';
  public productos: Array<any> = [];
  public pdMemory: Array<any> = [];
  public producto: any = {};
  public load_data = true;
  public page = 1;
  public pageSize = 10;
  public url = 'http://127.0.0.1:4201/api/get_portada/';
  public filtro_producto = '';

  constructor(private _productoService: ProductoService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')??'';
    this.init_data();
  }

  init_data() {
    this._productoService.listar_producto_admin(this.token).subscribe(
      resp => {
        this.productos = resp.data;
        this.pdMemory = resp.data;
        this.load_data = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  selectProducto(item: any) {
    this.producto = item;
  }

  filtrar() {
    this.productos = this.pdMemory;
    if (this.filtro_producto != '') {
      this.productos = this.productos.filter(a => a.titulo.toLowerCase().includes(this.filtro_producto));
    }
  }

  resetear() {
    this.productos = this.pdMemory;
    this.filtro_producto = '';
  }

  eliminar() {
    this._productoService.eliminar_producto_admin(this.producto._id, this.token).subscribe(
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
