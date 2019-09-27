import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { ViewUserPage } from '../view-user/view-user.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any;
  stateData = {
    rol: ''
  };
  user;
  constructor(
    private userService: UsersService,
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private modalCrtl: ModalController
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    const loading = await this.loadingController.create();
    loading.present();
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      console.log(res);
      loading.dismiss();
    });
  }

  async changeState(id, rol) {
    switch (rol) {
      case 'd':
        this.stateData.rol = 'customer';
        this.userService.changeStateUser(id, this.stateData).then(() => {
          this.msg('Usuario activado ya puede publicar');
        });
        break;
      case 'customer':
        this.stateData.rol = 'd';
        this.userService.changeStateUser(id, this.stateData).then(() => {
          this.msg('Usuario Desativado');
        });
        break;
    }
    console.log(id + ' ' + rol);
  }

  async viewUser(user) {
    const modal = await this.modalCrtl.create({
      component: ViewUserPage,
      componentProps: {
        user
      }
    });
    modal.present();
  }

  async msg(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
