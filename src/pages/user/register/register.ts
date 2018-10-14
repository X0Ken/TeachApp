import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { RestProvider } from '../../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { UserInfoPage } from '../info/userinfo';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  username: string = '';
  password: string = '';
  password2: string = '';
  uri: string = '/user'

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    public alertCtrl: AlertController) {
  }

  showAlert(error) {
    const alert = this.alertCtrl.create({
      title: 'Login failed!',
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();
  }

  register() {
    this.rest.register_user(this.username, this.password, this.password2).then(user => {
      this.navCtrl.setRoot(UserInfoPage);
    }, error => {
      this.showAlert(error);
    });
  }

  go_login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
