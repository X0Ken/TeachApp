import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { AllOrderPage } from '../order/order-overview/allorder';
import { LoginPage } from './login/login';

import { RestProvider } from '../../providers/rest/rest';



@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: object = { "username": "userfortest" };
  uri: string = '/token';

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    private app: App) {
    this.load_user();
  }

  load_user() {
    this.rest.try_login().then(value => {
      this.user = value;
    })
  }

  goAllOrder() {
    this.navCtrl.push(AllOrderPage);
  }

  login_out() {
    this.rest.login_out().then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

}
