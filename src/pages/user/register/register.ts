import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserPage } from '../user';

import { GlobalSettingService } from '../../global';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  username: string = '';
  password: string = '';
  password2: string = '';

  constructor(public navCtrl: NavController, public globalSetting: GlobalSettingService,
    private storage: Storage) {

  }

  check() {
    this.username = this.username.trim();
    this.password = this.password.trim();
    this.password2 = this.password2.trim();
    if (this.username.length == 0) {
      return -1;
    }
    if (this.password.length == 0) {
      return -1;
    }
    if (this.password != this.password2) {
      return -1;
    }
    return 0;
  }

  register() {
    if (this.check() < 0) {
      return;
    }
    this.storage.set('username', this.username);
    this.navCtrl.setRoot(UserPage);
  }


}
