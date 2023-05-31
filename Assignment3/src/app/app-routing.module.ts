import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule)
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
