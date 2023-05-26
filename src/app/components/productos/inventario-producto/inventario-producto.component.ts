import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public token = '';
  public id = '';
  public producto: any = {};
  public inventarios: Array<any> = [];

  constructor(private _route: ActivatedRoute, private _productoService: ProductoService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')??'';
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          resp => {
            if (resp.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = resp.data;

              this._productoService.listar_inventario_prodcuto_admin(this.producto._id, this.token).subscribe(
                resp => {
                  console.log(resp.data);
                  this.inventarios = resp.data;
                },
                err => {
                  console.log(err);
                }
              )
            }
          },
          err => {
            this.producto = undefined;
          }
        )
      }
    )
  }

}
