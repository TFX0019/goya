import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ActionSheetController } from '@ionic/angular';
import { ViewImagePage } from '../view-image/view-image.page';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {
  user;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private actionSheet: ActionSheetController
  ) { }

  async ngOnInit() {
    this.navParams.get('user');
    console.log(this.user);
  }

  async dismiss() {
    this.modalCtrl.dismiss();
  }

  // select Photo
  async takeFile(image, name, id) {
    const modal = await this.modalCtrl.create({
      component: ViewImagePage,
      componentProps: { image, name }

    });
    const sheet = await this.actionSheet.create({
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Ver foto',
          icon: 'eye',
          handler: () => {
            modal.present();
          }
        }
      ]
    });
    sheet.present();
  }


}
