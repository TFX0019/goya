import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPromotionPage } from './detail-promotion.page';
import { DetailMapPage } from '../detail-map/detail-map.page';
import { DetailMapPageModule } from '../detail-map/detail-map.module';

@NgModule({
  entryComponents: [
    DetailMapPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMapPageModule
  ],
  declarations: [DetailPromotionPage]
})
export class DetailPromotionPageModule {}
