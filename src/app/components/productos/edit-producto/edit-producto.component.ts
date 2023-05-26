import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {

  public producto: any = {};
  public imageSelect: string | ArrayBuffer = 'assets/img/01.jpg';
  public file: File = new File([''], "foo.txt", {type: "text/plain"});
  public token = '';
  public config = { height: 500 };
  public load_btn = false;
  public id = '';

  constructor(private _productoService: ProductoService, private _route: ActivatedRoute, private router: Router) { }

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
              this.imageSelect = 'http://127.0.0.1:4201/api/get_portada/' + this.producto.portada;
            }
          },
          err => {
            this.producto = undefined;
          }
        )
      }
    )
  }

  actualizar(updateForm: NgForm) {
    if (updateForm.valid) {
      this.load_btn = true;
      var data: any = {};
      if (this.file.name != 'foo.txt') {
        data.portada = this.file;
      }
      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;
      this._productoService.actualizar_producto_admin(data, this.id, this.token).subscribe(
        resp => {
          iziToast.show({
            title: 'BIEN',
            icon: 'ico-success',
            color: 'green',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizó correctamente el producto'
          });

          this.load_btn = false;
          this.router.navigate(['/panel/productos']);
        },
        err => {
          iziToast.show({
            title: 'ERROR',
            icon: 'ico-error',
            color: 'red',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            class: 'text-danger',
            position: 'topRight',
            message: 'Ocurrio un error'
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

  fileChangeEvent(event: Event): void {
    var input = event.target! as HTMLInputElement;
    var fileTmp: File;
    var fileMin = 4000000;
    var fileTypes = ['image/png', 'image/webp', 'image/jpg', 'image/gif', 'image/jpeg'];
    const portada = document.getElementById('file-portada');

    if (input.files && input.files[0]) {
      fileTmp = <File>input.files[0];

      if (fileTmp.size <= fileMin) {
        if (fileTypes.includes(fileTmp.type)) {
          const reader = new FileReader();

          reader.onload = e => this.imageSelect = reader.result!;
          reader.readAsDataURL(fileTmp);

          portada!.innerText = fileTmp.name;
          this.file = fileTmp;
        } else {
          iziToast.show({
            title: 'ERROR',
            icon: 'ico-error',
            color: 'red',
            overlayColor: 'rgba(0, 0, 0, 0.6)',
            class: 'text-danger',
            position: 'topRight',
            message: 'El archivo tiene un formato no permitido'
          });
          this.imageSelect = 'assets/img/01.jpg';
          portada!.innerText = 'Seleccionar imagen';
        }
      } else {
        iziToast.show({
          title: 'ERROR',
          icon: 'ico-error',
          color: 'red',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          class: 'text-danger',
          position: 'topRight',
          message: 'La imagen no puede superar los 4mb'
        });
        this.imageSelect = 'assets/img/01.jpg';
        portada!.innerText = 'Seleccionar imagen';
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        icon: 'ico-error',
        color: 'red',
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay imagen de envio'
      });
      this.imageSelect = 'assets/img/01.jpg';
      portada!.innerText = 'Seleccionar imagen';
    }
  }

}
