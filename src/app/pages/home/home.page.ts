import { Component, OnInit } from '@angular/core';
import { PromotionI } from '../../models/promotions';
import { PromotionsService } from 'src/app/services/promotions.service';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DetailPromotionPage } from '../detail-promotion/detail-promotion.page';
import { NewPromotionPage } from '../new-promotion/new-promotion.page';
import { FavoritesService } from 'src/app/services/favorites.service';
import { DetailMapPage } from '../detail-map/detail-map.page';
import { ViewImagePage } from '../view-image/view-image.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  promotions: PromotionI[];
  constructor(
    private promotionService: PromotionsService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private localData: FavoritesService,
    private toasCtrl: ToastController,
  ) {
    this.getPromotions();
  }

  ngOnInit() {
  }


  // listar promociones
  async getPromotions() {
    const loading = await this.loadingController.create({
      message: 'Espere...'
    });
    loading.present();
    this.promotionService.getPromotions().subscribe(res => {
      console.log(res);
      this.promotions = res;
      loading.dismiss();
    }, err => {
      console.log('err', err);
      loading.dismiss();
    });
  }
  // abrir detalles de promocion
  async openPromotions(promotion) {
    const modal = await this.modalController.create({
      component: DetailPromotionPage,
      componentProps: {
        path: 'home',
        param: promotion
      }
    });
    await modal.present();
  }
  // abrir modal de agregar promocion
  async addPromotion() {
    const modal = await this.modalController.create({
      component: NewPromotionPage
    });
    await modal.present();
  }

  // agregar promocion a favoritos
  async addFavorite(promotion) {
    const loading = await this.loadingController.create();
    loading.present();
    this.localData.saveFav(promotion);
    this.localData.getFav();
    loading.dismiss();
    this.msg('Agregado a favoritos', 'toast-success');
  }

  // open ubications
  async openUbications(title) {
    const modal = await this.modalController.create({
      component: DetailMapPage,
      componentProps: {
        title
      }
    });
    modal.present();
    console.log(title);
  }

  async viewImage(image, name) {
    const modal = await this.modalController.create({
      component: ViewImagePage,
      componentProps: { image, name }

    });
    modal.present();
  }

    // ver mensage
    async msg(msg: string, clase: string) {
    const toast = await this.toasCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: clase,
      position: 'top',
      animated: true
    });
    toast.present();
  }

}
