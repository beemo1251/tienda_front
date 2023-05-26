import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto: any = {};
  public file: File = new File([''], "foo.txt", {type: "text/plain"});
  public imageSelect: string | ArrayBuffer = 'assets/img/01.jpg';
  public config = { height: 500 };
  public token = '';
  public load_btn = false;

  constructor(private _productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')??'';
    this.config = {
      height: 500
    }
  }

  registro(registroForm: NgForm) {
    if (registroForm.valid) {
      if (this.file.name == 'foo.txt') {
        iziToast.show({
          title: 'ERROR',
          icon: 'ico-error',
          color: 'red',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe subir una imagen para registrar'
        });
      } else {
        this.load_btn = true;
        this._productoService.registro_producto_admin(this.producto, this.file, this.token).subscribe(
          resp => {
            iziToast.show({
              title: 'BIEN',
              icon: 'ico-success',
              color: 'green',
              overlayColor: 'rgba(0, 0, 0, 0.6)',
              class: 'text-success',
              position: 'topRight',
              message: 'Se registro correctamente el producto'
            });

            this.load_btn = false;
            this.router.navigate(['/panel/productos']);
          },
          err => {
            this.load_btn = false;
          }
        )
      }
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
