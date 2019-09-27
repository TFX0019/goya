import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PromotionI } from '../models/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  private promotionsColection: AngularFirestoreCollection<PromotionI>;
  private allPromotions: Observable<PromotionI[]>;

  constructor(db: AngularFirestore, private afs: AngularFirestore) {
    this.promotionsColection = db.collection<PromotionI>('promocion');
    this.allPromotions = this.promotionsColection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
   }

  // get promotions
  getPromotions() {
    return this.allPromotions;
  }
  // get one promotion
  getPromotion(id: string) {
    return this.promotionsColection.doc<PromotionI>(id).valueChanges();
  }
  // actualizar promocion
  updatePromotion(promotion: PromotionI, id: string) {
    return this.promotionsColection.doc(id).update(promotion);
  }
  //  add promotion
  addPromotion(promotion: PromotionI) {
    return this.promotionsColection.add(promotion);
  }
  // eliminar promotion
  removePromotion(id: string) {
    return this.promotionsColection.doc(id).delete();
  }

  getPromotionFromTitle(title: string) {
    return this.afs.collection('promocion', ref => ref.where('title', '==', title));
  }

}
