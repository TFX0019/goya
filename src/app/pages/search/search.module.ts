import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DetailPromotionPage } from '../detail-promotion/detail-promotion.page';
import { DetailPromotionPageModule } from '../detail-promotion/detail-promotion.module';

@NgModule({
  entryComponents: [
    DetailPromotionPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    DetailPromotionPageModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
