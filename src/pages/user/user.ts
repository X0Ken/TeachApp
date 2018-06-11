import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AllOrderPage } from '../order/allorder/allorder';
import { LoginPage } from './login/login';

import { GlobalSettingService } from '../global';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: object = { "username": "fuck" };
  uri: string = '/token';

  constructor(public navCtrl: NavController, public globalSetting: GlobalSettingService,
    private storage: Storage, public http: HttpClient) {
    this.load_user();
  }

  load_user() {
    console.log('GlobalSetting.user');
    console.log(this.globalSetting.user);
    if (this.globalSetting.user != null) {
      this.user = this.globalSetting.user;
      return;
    }

    this.storage.get("token_id").then(token_id => {
      // fake
      token_id = "96da3aee6b6e47b98f08664abfbc599a";



      if (token_id == null) {
        console.log('Go to page LoginPage.');
        this.navCtrl.setRoot(LoginPage);
      }
      else {
        console.log('Token id.');
        console.log(token_id);
        var url = this.globalSetting.serverAddress + this.uri;
        var body = {
          "auth": {
            "type": "token",
            "token_id": token_id
          }
        }
        this.http.post(url, body)
          .subscribe(data => {
            console.log("Load data from server");
            console.log(data);
            this.user = (data as any).token;
            this.globalSetting.user = this.user;
            this.storage.set("token_id", this.user['token_id']);
          },
            error => {
              console.error("This line is never called ", error);
            });
      }
    });
  }

  goAllOrder() {
    this.navCtrl.push(AllOrderPage);
  }

  login_out() {
    this.storage.remove('token_id');
    this.globalSetting.user = null;
    this.navCtrl.setRoot(LoginPage);
  }

}
