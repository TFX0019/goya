import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.page.html',
  styleUrls: ['./lost-password.page.scss'],
})
export class LostPasswordPage implements OnInit {
  dataLogin: any = {
    email: null
  }
  constructor(
    private userService: UsersService,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private toasCtrl: ToastController
  ) { }

  ngOnInit() {
  }


    async lostPass(email) {
    const loading = await this.loading.create({
      cssClass: 'custom-loading '
    });
    loading.present();
    await this.userService.lostPass(email).then(res => {
      this.msg('Se ah enviado un email a su correo electronico');
      loading.dismiss();
      this.modalCtrl.dismiss();
    }, err => {
        loading.dismiss();
        console.log(err);
        if (err.code === 'auth/argument-error') {
          this.msg('Introduce un correo electronico');
        } else if (err.code === 'auth/user-not-found') {
          this.msg('Tu email no se encuentra registrado');
        }
    });
  }

  async msg(msg: string) {
    const toast = await this.toasCtrl.create({
      message: msg,
      duration: 6000
    });
    toast.present();
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }




}
