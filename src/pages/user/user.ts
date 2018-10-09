import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

import { AllOrderPage } from '../order/order-overview/allorder';
import { LoginPage } from './login/login';

import { RestProvider } from '../../providers/rest/rest';
import { PostListPage } from './postlist/postlist';
import { ContactPage } from './contact/contact';
import { UserInfo, User } from '../models';
import { UserInfoPage } from './info/userinfo';
import { TalkListPage } from '../talk/list/list';



@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: User = null;
  userinfo: UserInfo = null;

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    private app: App) {
    this.load_user();
  }

  async load_user() {
    this.rest.try_login().then(value => {
      this.user = value;
    })
    this.userinfo = await this.rest.get_user_info();
  }

  goTalkList() {
    this.app.getRootNav().push(TalkListPage);
  }

  goAllOrder() {
    this.app.getRootNav().push(AllOrderPage);
  }

  goMyPostPage() {
    this.app.getRootNav().push(PostListPage);
  }

  go_contact_Page() {
    this.app.getRootNav().push(ContactPage);
  }

  goUserInfoPage() {
    this.app.getRootNav().push(UserInfoPage);
  }

  login_out() {
    this.rest.login_out().then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

}
