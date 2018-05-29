import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-find-job',
  templateUrl: 'findjob.html'
})
export class FindJobPage {
  items: Array<any>;
  path: string = 'http://47.104.87.111:8888/jobs';

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController) {
    this.initializeItems();
  }

  ionViewDidEnter() { 
    this.load_data();
  }


  initializeItems() {
    this.items = []
    //this.load_data()
  }



  load_data(){
    this.http.get(this.path)
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
