import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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
  uri: string = '/token'

  constructor(public navCtrl: NavController, public globalSetting: GlobalSettingService,
    private storage: Storage, public http: HttpClient) {

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

    var url = this.globalSetting.serverAddress + this.uri;
    var body = {
      "auth": {
        "type": "password",
        "username": this.username,
        "password": this.password
      }
    }
    this.http.post(url, body)
      .subscribe(data => {
        console.log("Get data from server.");
        console.log(data);
        this.globalSetting.user = data['token'];
        
        console.log("Set token_id to storage.");
        console.log(this.globalSetting.user['token_id']);
        this.storage.set("token_id", this.globalSetting.user['token_id']);

        console.log('Go to page UserPage.');
        this.navCtrl.setRoot(UserPage);
      },
        error => {
          console.error("This line is never called ", error);
        });

  }

  go_register() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
