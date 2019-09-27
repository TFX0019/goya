import { Component, OnInit } from '@angular/core';
import { CategotiesService } from 'src/app/services/categoties.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categories = null;
  dataCategoria = {
    title: ''
  };
  idc = '';
  constructor(
    private categoriaService: CategotiesService,
    private alertCtrl: AlertController,
    private toasCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    this.categoriaService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  async remove(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirma!',
      message: '¿Deseas eliminar esta categoria?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler: () => {
            this.categoriaService.delete(id);
            this.msg('Categoria ha sido eliminada.');
          }
        }
      ]
    });
    await alert.present();
    // mensaje de eliminado
  }

  // agregar categoria
  async agg() {
    if (!this.dataCategoria.title) {
      this.msg('Escribe una categoria');
    } else {
    const loading = await this.loadingCtrl.create();
    loading.present();
    if (this.idc === '') {
      this.categoriaService.add(this.dataCategoria).then(res => {
        this.msg('Categoria añadida con exito');
        this.dataCategoria.title = '';
        loading.dismiss();
      }, err => {
          this.msg('Error al añadir categoria');
          loading.dismiss();
      });
    } else {
      this.categoriaService.update(this.dataCategoria, this.idc).then(res => {
        this.msg('Categoria actualizada con exito');
        this.dataCategoria = {
          title: ''
        };
        this.idc = '';
        loading.dismiss();
      });
    }
  }
  }

  // seleccionar para editar
  async edit(id: string, title: string) {
    this.dataCategoria = {
      title
    };
    this.idc = id;
    console.log(id);
  }

  // ver mensage
  async msg(msg: string) {
    const toast = await this.toasCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      animated: true
    });
    toast.present();
  }

}
