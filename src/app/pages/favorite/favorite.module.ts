import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FavoritePage } from './favorite.page';
import { DetailPromotionPage } from '../detail-promotion/detail-promotion.page';
import { DetailPromotionPageModule } from '../detail-promotion/detail-promotion.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetailMapPage } from '../detail-map/detail-map.page';
import { DetailMapPageModule } from '../detail-map/detail-map.module';
import { ViewImagePage } from '../view-image/view-image.page';
import { ViewImagePageModule } from '../view-image/view-image.module';

const routes: Routes = [
  {
    path: '',
    component: FavoritePage
  }
];

@NgModule({
  entryComponents: [
    DetailPromotionPage,
    DetailMapPage,
    ViewImagePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DetailPromotionPageModule,
    ComponentsModule,
    DetailMapPageModule,
    ViewImagePageModule
  ],
  declarations: [FavoritePage]
})
export class FavoritePageModule {}
