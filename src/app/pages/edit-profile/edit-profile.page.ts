import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { paisesList } from '../register/paises';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  paises = paisesList.paises;
  userDataFrom = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    pais: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    fechaNac: new FormControl('')
  });
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private LoadingCtrl: LoadingController,
    private userService: UsersService
  ) {
  }

  async ngOnInit() {
    await this.getDataUser();
  }

  async getDataUser() {
    const userData = await this.navParams.get('userData');
    this.userDataFrom.controls.id.setValue(userData.ref);
    this.userDataFrom.controls.name.setValue(userData.name);
    this.userDataFrom.controls.email.setValue(userData.email);
    this.userDataFrom.controls.phone.setValue(userData.phone);
    this.userDataFrom.controls.pais.setValue(userData.pais);
    this.userDataFrom.controls.city.setValue(userData.city);
    this.userDataFrom.controls.address.setValue(userData.address);
    this.userDataFrom.controls.fechaNac.setValue(userData.fechaNac);
    console.log(userData);
  }

  async updateProfile() {
    const loading = await this.LoadingCtrl.create({
      message: 'Espere...'
    });
    loading.present();
    await this.userService.updateName(this.userDataFrom.value.email).then(() => {
      this.userService.updateAllData(this.userDataFrom.value.id, this.userDataFrom.value).then(() => {
        loading.dismiss();
        this.modalCtrl.dismiss();
      }, err => {
          loading.dismiss();
          this.modalCtrl.dismiss();
      });
    }, err => {
        loading.dismiss();
        this.modalCtrl.dismiss();
    });
  }

  async dismiss() {
    this.modalCtrl.dismiss();
  }

}
