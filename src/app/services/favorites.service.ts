import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorito: any[] = [];
  constructor(private storage: Storage) { 
    this.getFav();
  }
  // guardar un favorito
    async saveFav(promotion) {
    const existe = this.favorito.find(fav => fav.title === promotion.title);
    if (!existe) {
      this.favorito.unshift(promotion);
      await this.storage.set('favoritos', this.favorito);
    }
  }

  async removeFav(promotion) {
    const i = this.favorito.indexOf(promotion);
    this.favorito.splice(i, 1);
    await this.storage.set('favoritos', this.favorito);
  }
  // obtener favoritos
  async getFav() {
    return await this.storage.get('favoritos');
  }
}
