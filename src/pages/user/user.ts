import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AllOrderPage } from '../order/allorder/allorder';
import { LoginPage } from './login/login';

import { GlobalSettingService } from '../global';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: object = { "username": "fuck" };

  constructor(public navCtrl: NavController, public globalSetting: GlobalSettingService,
    private storage: Storage) {
    this.load_user();

  }

  load_user() {
    this.storage.get("username").then(username => {
      if (username == null) {
        this.navCtrl.setRoot(LoginPage);
      }
      else {
        this.user = {
          'username': username
        };
        this.globalSetting.user = this.user;
      }
    });
  }

  goAllOrder() {
    this.navCtrl.push(AllOrderPage);
  }

  login_out() {
    this.storage.remove('username');
    this.navCtrl.setRoot(LoginPage);
  }

}
