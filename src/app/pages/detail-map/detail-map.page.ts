import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, Platform, ModalController, NavParams } from '@ionic/angular';
import { UbicationsService } from 'src/app/services/ubications.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HtmlInfoWindow } from '@ionic-native/google-maps/ngx';
declare var google;

@Component({
  selector: 'app-detail-map',
  templateUrl: './detail-map.page.html',
  styleUrls: ['./detail-map.page.scss'],
})
export class DetailMapPage implements OnInit {
  markers: any[] = [];
  map;
  positMarket: any = [
    {
      position: {
        lat: 0,
        lng: 0
      },
      title: ''
    }
  ];
  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform,
    private ubicationsServices: UbicationsService,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  async loadMap() {
    const rta = await this.geolocation.getCurrentPosition();
    const myLating = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
    console.log(myLating);
    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      center: myLating,
      zoom: 14
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      console.log('map Loaded');
      const marker = new google.maps.Marker({
        position: {
          lat: myLating.lat,
          lng: myLating.lng
        },
        // zoom: 1,
        map: this.map,
        // title: 'My Ubicación',
        label: 'Mi Ubicación',
        icon: {
          url: '../../../assets/images/pingoya-01.png',
          scaledSize: new google.maps.Size(40, 40)
        },
      });
      this.getUbications(this.navParams.get('title'));
    });


  }


  // Adds a marker to the map.
  async addMarker(location, label, map) {
    const marker = await new google.maps.Marker({
      position: location,
      label,
      map,
      icon: {
        url: '../../../assets/images/pingoya-01.png',
        scaledSize: new google.maps.Size(40, 40)
      },
    });

    // google.maps.infoWindow.open(map, marker);
  }

  // async getUbications() {
  //   await this.ubicationsServices.getUbications().subscribe(datam => {
  //     this.positMarket = datam;
  //     this.positMarket.forEach(marker => {
  //       this.addMarker(marker.position, marker.title, this.map);
  //       this.markers.push(marker.position);
  //       // console.log(this.markers);
  //     });
  //     console.log(this.markers);
  //   }, err => console.log(err));
  // }

  async getUbications(title) {
    const loading = await this.loadingCtrl.create({
      message: 'Espere...'
    });
    loading.present();
    await this.ubicationsServices.getUbicationFromTitle(title).valueChanges().subscribe(res => {
      this.positMarket = res;
      this.positMarket.forEach(marker => {
        this.addMarker(marker.position, marker.title, this.map);
        this.markers.push(marker.position);
        loading.dismiss();
      });
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
