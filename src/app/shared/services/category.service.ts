import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<any[]> {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({
            key: a.key,   // Pega a chave de cada categoria
            ...a.payload.val() as {}  // Combina a chave com os dados da categoria
          }))
        )
      );
  }
}