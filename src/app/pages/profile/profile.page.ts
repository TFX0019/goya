import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { LoadingController, AlertController, ToastController, ModalController, ActionSheetController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { ViewImagePage } from '../view-image/view-image.page';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  fileURI: any;
  returnPath: any;
  uploadPercent: any;
  downloadURL: any;
  imageSelected = {
    image: ''
  };
  ERR_F_PATH: any;
  ERR_F_CHOOSER: any;
  constructor(
    private UserService: UsersService,
    private LoadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCrl: ToastController,
    private modalCtrl: ModalController,
    private actionSheet: ActionSheetController,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private base64: Base64,
    private fireStore: AngularFireStorage
  ) { }

  async ngOnInit() {
    this.getUser();
  }

  async getUser() {
    const loading = await this.LoadingCtrl.create({
      message: 'Espere...'
    });
    loading.present();
    await this.UserService.getInfoLoginUser().subscribe(res => {
      this.UserService.getUserEmail(res.email).valueChanges().subscribe(data => {
        console.log(data[0]);
        this.user = data;
        loading.dismiss();
      });
    });
  }

  async editarProfile(user) {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { userData: user }
    });
    modal.present();
  }


  // cambiar contraseña
  async changePassword(id, ypassword) {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar contraseña',
      inputs: [
        {
          name: 'oldpassword',
          type: 'password',
          placeholder: 'Antigua Contraseña'
        },
        {
          name: 'newpassword',
          type: 'password',
          placeholder: 'Nueva Contraseña'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Aceptar',
          handler: (data) => {
            if (data.oldpassword === ypassword) {
              this.UserService.changePassword(data.newpassword).then(res => {
                this.UserService.updatePassword(id, ypassword);
                this.UserService.logout();
              }, err => {
                  this.msg('Error al validar. Revise su conexion a internet');
              });
            } else {
              this.msg('Contraseña Invalida');
            }
          }
        }
      ]
    });
    alert.present();
  }


  // select Photo
  async takeFile(image, name, id) {
    const modal = await this.modalCtrl.create({
      component: ViewImagePage,
      componentProps: {image, name}

    });
    const sheet = await this.actionSheet.create({
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Abrir Galeria',
          icon: 'image',
          handler: () => {
            this.pickFile(name, id);
          }
        },
        {
          text: 'Ver foto',
          icon: 'eye',
          handler: () => {
            modal.present();
          }
        }
      ]
    });
    sheet.present();
  }




  // mensaje
  async msg(msg: string) {
    const toast = await this.toastCrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  pickFile(name, id) {
    this.fileChooser.open().then(fileuri => {
      this.filePath.resolveNativePath(fileuri).then(resolvednativepath => {
        this.fileURI = fileuri;
        this.returnPath = resolvednativepath;
        const filepath = resolvednativepath;
        if (filepath && name) {
          this.base64.encodeFile(filepath).then(base64file => {
            const filePath = `promotions/${name}.jpg`;
            const ref = this.fireStore.ref(filePath);
            const task = ref.putString(base64file, 'data_url');
            this.uploadPercent = task.percentageChanges();
            ref.getDownloadURL().subscribe(res => {
              this.downloadURL = res;
            });
            this.imageSelected.image = this.downloadURL;
            this.UserService.updateImageProfile(id, this.imageSelected).then(() => {
              this.msg('Success');
            })
          });
        } else {
          this.msg('Por favor Escribe un titulo para tu promoción');
        }
      }, err => {
        this.ERR_F_PATH = JSON.stringify(err);
      });
    }, err => this.ERR_F_CHOOSER = JSON.stringify(err));
  }


}
