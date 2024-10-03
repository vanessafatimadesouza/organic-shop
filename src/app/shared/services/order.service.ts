import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { map, Observable } from 'rxjs';
import { Order } from 'shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: unknown){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();

    return result;
  }

  getOrders(): Observable<Order[]> { 
    return this.db.list<Order>('/orders').valueChanges();
  }


  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({
            key: a.key,
            ...a.payload.val() as any
          })
       )
      )
    )
  }
}

 