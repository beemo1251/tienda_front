import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClientesComponent } from './components/clientes/edit-clientes/edit-clientes.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { EditProductoComponent } from './components/productos/edit-producto/edit-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent, canActivate: [AdminGuard] },
  { path: 'panel', children: [
    { path: 'clientes', component: IndexClienteComponent, canActivate: [AdminGuard] },
    { path: 'clientes/registro', component: CreateClienteComponent, canActivate: [AdminGuard] },
    { path: 'clientes/:id', component: EditClientesComponent, canActivate: [AdminGuard] },

    { path: 'productos', component: IndexProductoComponent, canActivate: [AdminGuard] },
    { path: 'productos/registro', component: CreateProductoComponent, canActivate: [AdminGuard] },
    { path: 'productos/:id', component: EditProductoComponent, canActivate: [AdminGuard] },
    { path: 'productos/inventario/:id', component: InventarioProductoComponent, canActivate: [AdminGuard] }
  ]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
