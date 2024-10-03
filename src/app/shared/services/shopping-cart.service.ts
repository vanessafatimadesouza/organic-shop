import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from 'shared/models/product';
import { take, map, catchError } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable, of } from 'rxjs';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<any>('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map(cart => {
          // Adicione uma verificação aqui
          if (!cart || !cart.items) {
            return new ShoppingCart({}); // Retorna um ShoppingCart vazio se cart for null
          }
          return new ShoppingCart(cart.items);
        }),
        catchError(error => {
          console.error('Error fetching cart', error);
          return of(new ShoppingCart({})); // Retorna um carrinho vazio em caso de erro
        })
      );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  async clearCart() { 
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);

  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }


  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      let cartItem = item as ShoppingCartItem;
      let quantity = (cartItem?.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({ 
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: (cartItem?.quantity || 0) + change,
          category: product.category
      });
    });
  }
}
