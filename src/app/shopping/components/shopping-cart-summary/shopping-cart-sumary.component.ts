import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-sumary.component.html',
  styleUrls: ['./shopping-cart-sumary.component.css']
})

export class ShoppingCartSummaryComponent  {
  @Input('cart') cart!: ShoppingCart;
}