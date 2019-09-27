import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, Platform, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-select-position',
  templateUrl: './select-position.page.html',
  styleUrls: ['./select-position.page.scss'],
})
export class SelectPositionPage implements OnInit {
  markers = [];
  positMarker: {
    lat: any,
    lng: any
  };
  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private geolocation: Geolocation
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
    const mapEle: HTMLElement = document.getElementById('getMap');
    const map = new google.maps.Map(mapEle, {
      center: myLating,
      zoom: 12
    });
    google.maps.event.addListener(map, 'click', event => {
      this.addMarker(event.latLng, map);
      this.positMarker = event.latLng;
      // console.log(event.latLng.lat());
    });
  }

  // Adds a marker to the map.
  async addMarker(location, map) {
    this.clearMarkers();
    const marker = await new google.maps.Marker({
      position: location,
      // label: 'Ubica',
      map
    });
    // console.log(marker.position);
    this.markers.push(marker);
    console.log(this.positMarker.lat());
  }

  async setMapOnAll(map) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  async clearMarkers() {
    this.setMapOnAll(null);
    this.markers = [];
  }


  async dismiss() {
    this.modalCtrl.dismiss();
  }

  async dismissPoin() {
    this.modalCtrl.dismiss({
      position: {
        lat: this.positMarker.lat(),
        lng: this.positMarker.lng(),
      }
    });
  }
}
