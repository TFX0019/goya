import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsersPage } from './users.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ViewUserPage } from '../view-user/view-user.page';
import { ViewUserPageModule } from '../view-user/view-user.module';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  }
];

@NgModule({
  entryComponents: [
    ViewUserPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ViewUserPageModule
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
