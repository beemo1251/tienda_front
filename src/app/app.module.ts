import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClientesComponent } from './components/clientes/edit-clientes/edit-clientes.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { EditProductoComponent } from './components/productos/edit-producto/edit-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClientesComponent,
    CreateProductoComponent,
    IndexProductoComponent,
    EditProductoComponent,
    InventarioProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../assets/tinymce/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
