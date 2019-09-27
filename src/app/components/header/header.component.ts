import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchPage } from 'src/app/pages/search/search.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titleHeader: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async buscar() {
    const modal = await this.modalCtrl.create({
      component: SearchPage
    });
    modal.present();
  }

}
