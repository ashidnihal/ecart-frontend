import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './all-product/all-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PnfComponent } from './pnf/pnf.component';

const routes: Routes = [
  {
    path:'',component:AllProductComponent
  },
  {
    path:'view/:id',component:ViewProductComponent
  },
  {
    path:'user/login',component:LoginComponent
  },
  {
    path:'user/register',component:RegisterComponent
  },
  {
    path:'user/cart',component:CartComponent
  },
  {
    path:'user/wishlist',component:WishlistComponent
  },
  {
    path:'**',component:PnfComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
