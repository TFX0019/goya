import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserI } from '../models/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersColections: AngularFirestoreCollection<UserI>;
  private userC: Observable<UserI[]>;

  constructor(
    db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: Storage
  ) {
    this.usersColections = db.collection<UserI>('users');
    this.userC = this.usersColections.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  // login
  async login(email: string, password: string) {
    const promise = await new Promise((resolve: any, reject: any) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(data => {
        resolve(data);
      }, err => reject(err));
    });
    return promise;
  }
  // registro
  async register(user: UserI) {
    const promise = await new Promise((resolve: any, reject: any) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(data => {
        resolve(data);
      }, err => reject(err));
    });
    return promise;
  }
  // desloguearse
  async logout() {
    return await this.afAuth.auth.signOut();
  }
  // olvido se contraseña
  async lostPass(email: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(email);
  }
  // validar usuario
  async validarUser() {
    return await this.afAuth.auth;
  }

  agrUser(user: UserI) {
    return this.usersColections.add(user);
  }
  // obtener usuarios
  getUsers() {
    return this.userC;
  }

  getUserID(id: string) {
    return this.usersColections.doc(id).valueChanges();
  }
  getUserEmail(email: string) {
    return this.afs.collection('users', ref => ref.where('email', '==', email));
  }
  getInfoLoginUser() {
    return this.afAuth.user;
  }
  // cambiar contraseña
  changePassword(password: any) {
    return this.afAuth.auth.currentUser.updatePassword(password);
  }
  updatePassword(id: string, password: string) {
    return this.usersColections.doc(id).update(password);
  }
  // cambiar nombre
  updateName(email: string) {
    return this.afAuth.auth.currentUser.updateEmail(email);
  }
  // actualizar todos los demas campos
  updateAllData(id: string, user: any) {
    return this.usersColections.doc(id).update(user);
  }

  // update imagen
  updateImageProfile(id: string, image: any) {
    return this.usersColections.doc(id).update(image);
  }
  // change state user
  changeStateUser(id: string, rol: any) {
    return this.usersColections.doc(id).update(rol);
  }

  saveUserStorage(user: UserI) {
    return this.storage.set('userData', user);
  }

  getUserStorage() {
    return this.storage.get('userData');
  }


  // get documento
  // getDocumentParent() {
  //   return this.usersColections.doc(id).collection('users').
  // }
}
