import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapsPage } from './maps.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetailPromotionPage } from '../detail-promotion/detail-promotion.page';
import { DetailPromotionPageModule } from '../detail-promotion/detail-promotion.module';

const routes: Routes = [
  {
    path: '',
    component: MapsPage
  }
];

@NgModule({
  entryComponents: [
    DetailPromotionPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    DetailPromotionPageModule
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
