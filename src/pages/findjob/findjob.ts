import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-find-job',
  templateUrl: 'findjob.html'
})
export class FindJobPage {
  items: Array<any>;
  path: string = 'http://localhost:8888/jobs';

  constructor(public navCtrl: NavController, public http: HttpClient) {
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
    });
  }

}
