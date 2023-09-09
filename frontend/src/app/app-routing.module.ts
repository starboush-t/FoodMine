import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { FoodPageComponent } from './component/pages/food-page/food-page.component';
import { CartComponent } from './component/pages/cart/cart.component';
import { LoginPageComponent } from './component/pages/login-page/login-page.component';
import { RegisterPageComponent } from './component/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './component/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './component/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './component/pages/order-track-page/order-track-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  { path: 'cart-page', component: CartComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'track/:orderId',
    component: OrderTrackPageComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
