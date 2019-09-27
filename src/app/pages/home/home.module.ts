import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetailPromotionPage } from '../detail-promotion/detail-promotion.page';
import { NewPromotionPage } from '../new-promotion/new-promotion.page';
import { DetailPromotionPageModule } from '../detail-promotion/detail-promotion.module';
import { NewPromotionPageModule } from '../new-promotion/new-promotion.module';
import { DetailMapPage } from '../detail-map/detail-map.page';
import { DetailMapPageModule } from '../detail-map/detail-map.module';
import { ViewImagePage } from '../view-image/view-image.page';
import { ViewImagePageModule } from '../view-image/view-image.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  entryComponents: [
    DetailPromotionPage,
    NewPromotionPage,
    DetailMapPage,
    ViewImagePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    DetailPromotionPageModule,
    NewPromotionPageModule,
    DetailMapPageModule,
    ViewImagePageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
