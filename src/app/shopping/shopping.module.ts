import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-sumary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'order-success/:id', component: OrderSuccessComponent},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
      {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
      { path: 'order/:id', component: OrderDetailsComponent }
    ])
  ],
  declarations:[
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShippingFormComponent,
    ShoppingCartSummaryComponent,
    OrderDetailsComponent
  ]
})
export class ShoppingModule { }
