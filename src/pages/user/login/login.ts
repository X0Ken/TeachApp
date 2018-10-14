import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../../tabs/tabs';
import { RegisterPage } from '../register/register';

import { RestProvider } from '../../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { MsgCheckProvider } from '../../../providers/msg';
import { Storage } from '@ionic/storage';
import { User } from '../../models';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public msgProvider: MsgCheckProvider,
    private storage: Storage,
    private rest: RestProvider) {

  }

  showAlert(error) {
    const alert = this.alertCtrl.create({
      title: 'Login failed!',
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();
  }

  login() {
    this.rest.login_by_password(this.username, this.password).then(async (user: User) => {
      console.log("login success! go to root page.");
      let prev = await this.storage.get("user_id");
      if (prev != user.id) {
        this.msgProvider.clear();
      }
      this.navCtrl.setRoot(TabsPage);
    }, error => {
      this.showAlert(error);
    });
  }

  go_register() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
