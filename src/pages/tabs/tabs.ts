import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OfferJobPage } from '../offerjob/offerjob';
import { FindJobPage } from '../findjob/findjob';
import { UserPage } from '../user/user';
import { AskPage } from '../ask/ask-write/ask';
import { LoginPage } from '../user/login/login';

import { RestProvider } from '../../providers/rest/rest';
import { Events } from 'ionic-angular';
import { AnswerKeywordPage } from '../answer/keyword/keyword';
import { MsgCheckProvider } from '../../providers/msg';


@Component({
  selector: 'ng-if-else',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AskPage;
  tab2Root = AnswerKeywordPage;
  tab3Root = OfferJobPage;
  tab4Root = FindJobPage;
  tab5Root = UserPage;

  login: boolean = false;

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    public events: Events,
    public msgProvider: MsgCheckProvider
  ) {
    events.subscribe('user:login', () => {
      console.log('Need auth');
      this.msgProvider.stop();
      this.go_login();
    });
    this.try_login();
  }


  go_login() {
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidEnter() {
    this.try_login();
  }

  try_login() {
    console.log('ts try login');
    this.rest.try_login().then(value => {
      console.log('Get user: ', value);
      this.login = true;
      this.msgProvider.start();
      return;
    }, error => {
      console.log('Go to page LoginPage.');
      this.login = false;
      this.go_login();
    });
  }


}
