import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPromotionPage } from './new-promotion.page';
import { SelectPositionPage } from '../select-position/select-position.page';
import { SelectPositionPageModule } from '../select-position/select-position.module';


@NgModule({
  entryComponents: [
    SelectPositionPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SelectPositionPageModule
  ],
  declarations: [NewPromotionPage]
})
export class NewPromotionPageModule {}
