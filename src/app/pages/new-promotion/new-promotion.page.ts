import { Component, OnInit, Renderer2 } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Base64 } from '@ionic-native/base64/ngx';
import { Observable } from 'rxjs';
import { PromotionsService } from 'src/app/services/promotions.service';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { CategotiesService } from 'src/app/services/categoties.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectPositionPage } from '../select-position/select-position.page';
import { UbicationsService } from 'src/app/services/ubications.service';

@Component({
  selector: 'app-new-promotion',
  templateUrl: './new-promotion.page.html',
  styleUrls: ['./new-promotion.page.scss'],
})
export class NewPromotionPage implements OnInit {
  map;
  loading: any;
  sucursales: any[] = [];

  promotionDataForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    beneficio: new FormControl(''),
    phone: new FormControl(''),
    website: new FormControl('https://'),
    categoria: new FormControl(''),
    promotionStart: new FormControl(''),
    promotionEnd: new FormControl(''),
    image: new FormControl('')
  });
  myPosition: any;

  returnPath = '';
  fileURI = '';
  ERR_F_CHOOSER = '';
  ERR_F_PATH = '';
  uploadPercent: Observable<number>;
  image: string;
  // downloadURL: Observable<string>;
  downloadURL;
  markers = [];
  categorias = null;
  selectCategoriesOptions: any = {
    header: 'Selecciona una categoria'
  };
  errMap: any;

  constructor(
    private platform: Platform,
    public fileChooser: FileChooser,
    public filePath: FilePath,
    private fireStore: AngularFireStorage,
    private base64: Base64,
    private modalCtrl: ModalController,
    private LoadingCtrl: LoadingController,
    private PromotionService: PromotionsService,
    private categoriesService: CategotiesService,
    private ubicationService: UbicationsService,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.listarCategories();
    // const ref = this.fireStore.ref('promotions/qweqweqwe.jpg'); 
  }

  async addPromotion() {
    const loading = await this.LoadingCtrl.create({
      message: 'Publicando...'
    });
    loading.present();
    this.promotionDataForm.value.promotionStart.substring(0, 9);
    this.promotionDataForm.value.promotionEnd.substring(0, 9);
    this.PromotionService.addPromotion(this.promotionDataForm.value).then(res => {
      this.sucursales.forEach(sucursal => {
        sucursal.title = this.promotionDataForm.value.title;
        this.ubicationService.addUbication(sucursal);
      });
      this.msg('Su Promoción a sido agregada');
      loading.dismiss();
      this.modalCtrl.dismiss();
    }, err => {
      this.msg(err.message);
      loading.dismiss();
    });
    console.log(this.promotionDataForm.value);
  }

  async addMap() {
    const modal = await this.modalCtrl.create({
      component: SelectPositionPage
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
    this.sucursales.push(data);
    console.log(this.sucursales);
  }

  async deleteUbication(s) {
    const i = this.sucursales.indexOf(s);
    this.sucursales.splice(i, 1);

    console.log(this.sucursales);
  }
  // cargar mapa
  async modalDismiss() {
    const modal = await this.modalCtrl.dismiss();
  }

  // listar categorias
  async listarCategories() {
    await this.categoriesService.getCategories().subscribe(data => {
      this.categorias = data;
    });
  }

  async pickFile() {
    const loading = await this.LoadingCtrl.create({
      message: 'Subiendo imagen...'
    });
    loading.present();
    this.fileChooser.open().then(fileuri => {
      this.filePath.resolveNativePath(fileuri).then(resolvednativepath => {
        this.fileURI = fileuri;
        this.returnPath = resolvednativepath;
        const filepath = resolvednativepath;
        if (filepath && this.promotionDataForm.value.title) {
          this.base64.encodeFile(filepath).then(base64file => {
            const filePath = `promotions/${this.promotionDataForm.value.title}.jpg`;
            const ref = this.fireStore.ref(filePath);
            const task = ref.putString(base64file, 'data_url');
            this.uploadPercent = task.percentageChanges();
            ref.getDownloadURL().subscribe(res => {
              this.downloadURL = res;
            });
            this.promotionDataForm.controls.image.setValue = this.downloadURL;
            loading.dismiss();
          });
        } else {
          loading.dismiss();
          this.msg('Por favor Escribe un titulo para tu promoción');
        }
      }, err => {
          this.ERR_F_PATH = JSON.stringify(err);
          loading.dismiss();
      });
    }, err => {
        this.ERR_F_CHOOSER = JSON.stringify(err);
        loading.dismiss();
    });
  }

  async msg(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000
    });
    toast.present();
  }


}
