import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: unknown){
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any[]> {
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }))
      )
    );
  }

  get(productId: string): Observable<any>{
    return this.db.object('/products/${productId}').snapshotChanges().pipe(
      map(action => ({ key: action.payload.key, ...action.payload.val() as {} }))
    );
  }

  update(productId: string, product: Partial<unknown>){
    return this.db.object('/products/' + productId).update(product)
  }

  delete(productId: string){
    return this.db.object('/products/' + productId).remove();
  }
}
