import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl } from '@angular/forms';
import { paisesList } from './paises';
import { IonSlides, ToastController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  paises = paisesList.paises;
  @ViewChild('registerPersonal', null) registerPersonal: IonSlides;
  RDF = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
    pais: new FormControl(''),
    city: new FormControl(''),
    fechaNac: new FormControl(''),
    referido: new FormControl(''),
    ref: new FormControl(''),
    rol: new FormControl('d')
  });

  slideCtrl = {
    position: 0,
    form_one: false,
    form_two: false,
    form_three: false,
  };

  slideButtonBack = false;
  constructor(
    private userService: UsersService,
    private toasCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  refID: {
    ref: any
  };

  ngOnInit() {
    this.registerPersonal.lockSwipes(true);
    console.log(this.registerPersonal);
  }
  // btn next slide
  // nextP(user) {
  //   this.registerPersonal.slideNext().then(res => {
  //     this.registerPersonal.getActiveIndex().then(res => {
  //       const ind: number = res;
  //       if (ind === 2) {
  //         this.addUser(user);
  //       }
  //     });
  //   });
  // }

  async nextForm() {
    const slideActive = await this.registerPersonal.getActiveIndex();
    switch (slideActive) {
      case 0:
        this.slideButtonBack = false;
        if (this.RDF.value.name !== '' && this.RDF.value.phone !== '' && this.RDF.value.address !== '' && this.RDF.value.fechaNac !== '') {
          console.log('ok');
          this.registerPersonal.lockSwipes(false);
          this.registerPersonal.slideTo(1);
          this.registerPersonal.lockSwipes(true);
        } else {
          this.msg('Por Favor rellene todos los campos');
        }
        break;
      case 1:
        this.slideButtonBack = true;
        if (this.RDF.value.email !== '' && this.RDF.value.password !== '' && this.RDF.value.repassword !== '') {
          if (this.RDF.value.password === this.RDF.value.repassword) {
            console.log('ok');
            this.registerPersonal.lockSwipes(false);
            this.registerPersonal.slideTo(2);
            this.registerPersonal.lockSwipes(true);
          } else {
            this.msg('Contraseñas no son iguales');
          }
        } else {
          this.msg('Por Favor rellene todos los campos');
        }
        break;
      case 2:
        this.slideButtonBack = true;
        if (this.RDF.value.pais !== '' && this.RDF.value.city !== '' && this.RDF.value.referido !== '') {
          console.log('registered');
          this.addUser();
        } else {
          this.msg('Por Favor rellene todos los campos');
        }
        break;
    }
    console.log(slideActive)
  }

  prevForm() {
    this.registerPersonal.lockSwipes(false);
    this.registerPersonal.slidePrev();
    this.registerPersonal.lockSwipes(true);
  }

  async addUser() {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando...'
    });
    loading.present();
    await this.userService.register(this.RDF.value).then(res => {
      // console.log(res);
      this.userService.agrUser(this.RDF.value).then(data => {
        console.log(data);
        this.RDF.controls.ref.setValue(data.id);
        this.userService.updateAllData(data.id, this.RDF.value).then(() => {
          this.msg('Usuario registrado con exito. Espera que un administrador acepte tu solicitud');
          loading.dismiss();
          this.userService.logout();
          this.navCtrl.navigateBack('/login');
        }, err => {
            this.msg(err.message);
            loading.dismiss();
        });
      }, err => {
          this.msg(err.message);
          loading.dismiss();
      });
    }, err => {
      this.msg(err.message);
      loading.dismiss();
    });
    // console.log(this.RDF.value);
  }

  async changeButton(event) {
    console.log(event);
  }

  async msg(msg: string) {
    const toast = await this.toasCtrl.create({
      message: msg,
      duration: 6000
    });
    toast.present();
  }

}
