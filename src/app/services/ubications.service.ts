import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapI } from '../models/map';

@Injectable({
  providedIn: 'root'
})
export class UbicationsService {
  private ubicationsCollections: AngularFirestoreCollection<MapI>;
  private ubications: Observable<MapI[]>;

  constructor(db: AngularFirestore, private afs: AngularFirestore) {
    this.ubicationsCollections = db.collection<MapI>('ubications');
    this.ubications = this.ubicationsCollections.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  getUbications() {
    return this.ubications;
  }

  addUbication(ubication: MapI) {
    return this.ubicationsCollections.add(ubication);
  }

  getUbicationFromTitle(title: string) {
    return this.afs.collection('ubications', ref => ref.where('title', '==', title));
  }

}
