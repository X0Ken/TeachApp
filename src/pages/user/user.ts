import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AllOrderPage } from '../order/allorder/allorder';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  constructor(public navCtrl: NavController) {

  }

  goAllOrder(){
    this.navCtrl.push(AllOrderPage);
  }

}
