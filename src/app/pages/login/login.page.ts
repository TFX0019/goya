import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ToastController, LoadingController, NavController, ModalController } from '@ionic/angular';
import { LostPasswordPage } from '../lost-password/lost-password.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginData = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  rol;
  constructor(
    private userService: UsersService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private nav: NavController,
    private ModalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    loading.present();
    if (this.loginData.value.email === '' && this.loginData.value.password === '') {
      this.msg('Rellena todo el formulario');
    } else {
      await this.userService.getUserEmail(this.loginData.value.email).valueChanges().subscribe(data => {
        this.rol = data[0];
        if (this.rol.rol === 'd') {
          this.msg('Usuario Todavia no a sido activado');
          loading.dismiss();
        } else {
          this.userService.saveUserStorage(this.rol);
          this.userService.login(this.loginData.value.email, this.loginData.value.password).then(res => {
            this.nav.navigateForward('/tabs/home');
            loading.dismiss();
          }, err => {
            this.msg('Error usuario/Contraseña invalidos')
            loading.dismiss();
          });
        }
      });
    }
  }

  // login
  // async login() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Cargando...'
  //   });
  //   loading.present();
  //   this.userService.login(this.loginData.value.email, this.loginData.value.password).then(res => {
  //     console.log(res);
  //     loading.dismiss();
  //     this.nav.navigateForward('/tabs/home');
  //   }, err => {
  //       console.log(err);
  //       loading.dismiss();
  //       this.msg(err.message);
  //   });
  //   console.log(this.loginData.value);
  // }

  // mensaje del toast
  async msg(text: string) {
    const toast = await this.toastCtrl.create({
      duration: 5000,
      message: text
    });
    toast.present();
  }
  // modal de olvido su contraseña
  async openLostPass() {
    const modal = await this.ModalCtrl.create({
      component: LostPasswordPage
    });
    modal.present();
  }

}
