import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { PromotionsService } from 'src/app/services/promotions.service';
import { PromotionI } from 'src/app/models/promotions';
import { FavoritesService } from 'src/app/services/favorites.service';
import { DetailPromotionPage } from '../detail-promotion/detail-promotion.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  seachPromotions: PromotionI[] = [];
  filterSearch = '';
  constructor(
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    private promotionService: PromotionsService,
    private localData: FavoritesService,
    private toasCtrl: ToastController
    ) {
    }

  async ngOnInit() {
    await this.getSearchPromotions();
  }
  // listar promociones
  async getSearchPromotions() {
    // const loading = await this.loadingController.create({
    //   message: 'Espere...'
    // });
    // loading.present();
    this.promotionService.getPromotions().subscribe(res => {
      console.log(res);
      this.seachPromotions = res;
      // loading.dismiss();
    }, err => {
      console.log('err', err);
    });
  }

  // cerrar modal
  async dismiss() {
    this.modalCtrl.dismiss();
  }
  // busqueda
  async buscar(event) {
    this.getSearchPromotions();
    this.filterSearch = event.detail.value;
    if (this.filterSearch === null) {
      this.filterSearch = '';
    }
    console.log(this.filterSearch);
  }

  // agregar promocion a favoritos
  async addFavorite(promotion) {
    const loading = await this.loadingController.create();
    loading.present();
    this.localData.saveFav(promotion);
    loading.dismiss();
    this.msg('Agregado a favoritos', 'toast-success');
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

  // abrir detalles de promocion
  async openPromotions(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetailPromotionPage,
      componentProps: {
        promotions: id
      }
    });
    await modal.present();
  }

}
