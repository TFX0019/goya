import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesI } from '../models/categories';
@Injectable({
  providedIn: 'root'
})
export class CategotiesService {
  private categoriesColleccions: AngularFirestoreCollection<CategoriesI>;
  private categorias: Observable<CategoriesI[]>;

  constructor(db: AngularFirestore) { 
    this.categoriesColleccions = db.collection<CategoriesI>('categorias');
    this.categorias = this.categoriesColleccions.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }
  // obtener todas las categorias
  getCategories() {
    return this.categorias;
  }
  // borrar categoria
  delete(id: string) {
    return this.categoriesColleccions.doc(id).delete();
  }
  // agregar categoria
  add(categoria: CategoriesI) {
    return this.categoriesColleccions.add(categoria);
  }
  // actualizar categorias
  update(categoria: CategoriesI, id: string) {
    return this.categoriesColleccions.doc(id).update(categoria);
  }
}
