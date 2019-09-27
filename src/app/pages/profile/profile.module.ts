import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { EditProfilePageModule } from '../edit-profile/edit-profile.module';
import { ViewImagePage } from '../view-image/view-image.page';
import { ViewImagePageModule } from '../view-image/view-image.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  entryComponents: [
    EditProfilePage,
    ViewImagePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    EditProfilePageModule,
    ViewImagePageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
