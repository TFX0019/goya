import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  rol = {
    rol: null
  };
  constructor(
    private userService: UsersService,
    private loadingCtrl: LoadingController,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.validPermised();
  }

  async logout() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.userService.logout().then(() => {
      loading.dismiss();
      this.nav.navigateBack('/login');
    });
  }

  async validPermised() {
    this.rol = await this.userService.getUserStorage();
    console.log(this.rol);
  }

}
