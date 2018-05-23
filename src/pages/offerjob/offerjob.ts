import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchPage } from '../common/search/search';

@Component({
  selector: 'page-offer-job',
  templateUrl: 'offerjob.html'
})
export class OfferJobPage {
  school: string = '';

  constructor(public navCtrl: NavController) {

  }

  goSearch() {
    //this.navCtrl.setRoot(SearchPage);
    this.navCtrl.push(SearchPage, {callback: this.myCallbackFunction});
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      console.log(_params);
      this.school = _params;
      resolve();
    });
   }

   submit(){
    console.log(this.school);
   }

}
