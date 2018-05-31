import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { GlobalSettingService } from '../global';

@Component({
  selector: 'page-find-job',
  templateUrl: 'findjob.html'
})
export class FindJobPage {
  items: Array<any>;
  path: string = '/jobs';

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController,
    public globalSetting:GlobalSettingService) {
    this.initializeItems();
  }

  ionViewDidEnter() { 
    this.load_data();
  }


  initializeItems() {
    this.items = [];
    //this.load_data()
  }



  load_data(){
    var url = this.globalSetting.serverAddress + this.path;
    this.http.get(url)
    .subscribe(data => {
      console.log(data);
      this.items = (data as any).jobs;
    },
    error =>{
      console.error("This line is never called ",error);
      let alert = this.alertCtrl.create({
        title: 'New Friend!',
        subTitle: error,
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
