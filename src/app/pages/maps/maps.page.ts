import { Component, OnInit } from '@angular/core';
// import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, Platform, ModalController } from '@ionic/angular';
import { UbicationsService } from 'src/app/services/ubications.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DetailPromotionPage } from '../detail-promotion/detail-promotion.page';
declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  markerIcon = {
    url: '../../../assets/images/pingoya-01.png',
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };
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
    private modalCtrl: ModalController
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
        }
      });
      this.getUbications();
    });


  }

  // Adds a marker to the map.
  async addMarker(location, label, map) {
    const modal = await this.modalCtrl.create({
      component: DetailPromotionPage,
      componentProps: {
        path: 'maps',
        param: label
      }
    });
    const marker = await new google.maps.Marker({
    position: location,
    icon: {
      url: '../../../assets/images/pingoya-01.png',
      scaledSize: new google.maps.Size(40, 40)
    },
    label,
    map
  });

    google.maps.event.addListener(marker, 'click', () => {
      modal.present();
  });
  }

  async getUbications() {
    await this.ubicationsServices.getUbications().subscribe(datam => {
      this.positMarket = datam;
      this.positMarket.forEach(marker => {
        this.addMarker(marker.position, marker.title, this.map);
        this.markers.push(marker.position);
        // console.log(this.markers);
      });
      console.log(this.markers);
    }, err => console.log(err));
  }


}
