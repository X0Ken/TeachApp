import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserPage } from '../user';
import { RegisterPage } from '../register/register';

import { GlobalSettingService } from '../../global';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(public navCtrl: NavController, public globalSetting: GlobalSettingService,
    private storage: Storage) {

  }

  check() {
    this.username = this.username.trim();
    if (this.username.length == 0) {
      return -1;
    }
    return 0;
  }

  login() {
    if (this.check() < 0) {
      return;
    }
    this.storage.set('username', this.username);
    this.navCtrl.setRoot(UserPage);
  }

  go_register() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
