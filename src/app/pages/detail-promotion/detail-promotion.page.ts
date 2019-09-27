import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, LoadingController, ToastController } from '@ionic/angular';
import { PromotionI } from '../../models/promotions';
import { PromotionsService } from '../../services/promotions.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FavoritesService } from 'src/app/services/favorites.service';
import { DetailMapPage } from '../detail-map/detail-map.page';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.page.html',
  styleUrls: ['./detail-promotion.page.scss'],
})
export class DetailPromotionPage implements OnInit {
  @Input() promotions;
  @Input() favorito;
  idp: any = {
    path: null,
    param: null
  };
  fovorito = null;
  titleMaps = null;
  promotion: PromotionI;
  favorites: any[] = [];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private promotionService: PromotionsService,
    private loadingController: LoadingController,
    private inappbrowser: InAppBrowser,
    private toasCtrl: ToastController,
    private LocalData: FavoritesService
  ) { }

  ngOnInit() {
    this.idp.path = this.navParams.get('path');
    this.idp.param = this.navParams.get('param');
    switch (this.idp.path) {
      case 'favorito':
        this.promotion = this.idp.param;
        console.log(this.promotion);
        break;
      case 'home':
        this.promotion = this.idp.param;
        console.log(this.promotion);
        break;
      case 'maps':
        this.promotionService.getPromotionFromTitle(this.idp.param).valueChanges().subscribe((res: PromotionI[]) => {
          console.log(res);
          this.promotion = res[0];
        });
        break;
    
      default:
        console.log('path undefained');
        break;
    }
    // this.fovorito = this.navParams.get('favorito');
    // if (this.fovorito) {
    //   this.promotion = this.fovorito;
    //   console.log(this.promotion);
    // } else if (this.idp) {
    //   this.idp = this.navParams.get('promotions');
    //   this.getPromotion();
    // } else {
    //   this.titleMaps = this.navParams.get('title');
    //   // console.log(this.titleMaps);
    //   this.promotionService.getPromotionFromTitle(this.titleMaps).valueChanges().subscribe((res: PromotionI[]) => {
    //     console.log(res);
    //     this.promotion = res[0];
    //   });
    // }
    // console.log(this.fovorito);
    // console.log(this.idp);
  }
  // obtener promociones
  async getPromotion() {
    const loading = await this.loadingController.create();
    loading.present();
    await this.promotionService.getPromotion(this.idp).subscribe(res => {
      console.log(res);
      this.promotion = res;
      loading.dismiss();
    }, err => {
      console.log('err', err);
    });
  }

  // cerrar modal
  async dismiss() {
    await this.modalController.dismiss();
  }

  // agregar a favorito
  async addFavorite(promotion) {
    const loading = await this.loadingController.create();
    loading.present();
    this.LocalData.saveFav(promotion);
    loading.dismiss();
    this.msg('Agregado a favoritos', 'toast-success');
  }

  // abrir url
  async openurl(url: string) {
    const browser = await this.inappbrowser.create('url', '_system');
  }

  // abrir mapa
  async openmap(coord: any) {
    const browser = await this.inappbrowser.create(`https://www.google.co.ve/maps/@${coord.lat},${coord.lng}z`, '_system');
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


  // preparar mensaje
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
