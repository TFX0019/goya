import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.page.html',
  styleUrls: ['./view-image.page.scss'],
})
export class ViewImagePage implements OnInit {
  image;
  name;
  constructor(
    private modalCtrl: ModalController,
    private navparams: NavParams
  ) { }

  async ngOnInit() {
    await this.navparams.get('image');
    await this.navparams.get('name');
  }

  async dismiss() {
    this.modalCtrl.dismiss();
  }
}
