import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from '../pages/search/search.page';
import { SearchPageModule } from '../pages/search/search.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent
  ],
  entryComponents: [
    SearchPage
  ],
  exports: [
HeaderComponent,
MenuComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    SearchPageModule,
    RouterModule
  ]
})
export class ComponentsModule { }
