import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FavoritesService } from 'src/app/services/favorites.service';
import { DetailPromotionPage } from '../detail-promotion/detail-promotion.page';
import { DetailMapPage } from '../detail-map/detail-map.page';
import { ViewImagePage } from '../view-image/view-image.page';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favorites = null;
  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private localData: FavoritesService,
  ) {
    // this.getFavorites();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getFavorites();
  }

  async getFavorites() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.localData.getFav().then(fav => {
      this.favorites = fav;
    })
    loading.dismiss();
  }

  async viewPromotion(promotion) {
    const modal = await this.modalCtrl.create({
      component: DetailPromotionPage,
      componentProps: {
        path: 'favorito',
        param: promotion
      }
    });
    modal.present();
  }

  // open ubications
  async openUbications(title) {
    const modal = await this.modalCtrl.create({
      component: DetailMapPage,
      componentProps: {
        title
      }
    });
    modal.present();
    console.log(title);
  }

  async viewImage(image, name) {
    const modal = await this.modalCtrl.create({
      component: ViewImagePage,
      componentProps: { image, name }

    });
    modal.present();
  }

  async removeFavorites(fav) {
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.localData.removeFav(fav).then(() => {
      this.localData.getFav();
      loading.dismiss();
    });
  }

}
