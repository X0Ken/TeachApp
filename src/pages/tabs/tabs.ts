import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OfferJobPage } from '../offerjob/offerjob';
import { FindJobPage } from '../findjob/findjob';
import { UserPage } from '../user/user';
import { AskPage } from '../ask/ask-write/ask';
import { AnswerListPage } from '../answer/answer-list/answer-list';
import { LoginPage } from '../user/login/login';

import { RestProvider } from '../../providers/rest/rest';
import { Events } from 'ionic-angular';

@Component({
  selector: 'ng-if-else',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AskPage;
  tab2Root = AnswerListPage;
  tab3Root = OfferJobPage;
  tab4Root = FindJobPage;
  tab5Root = UserPage;

  user: object = null;
  login: boolean = false;

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    public events: Events
  ) {

    events.subscribe('user:login', () => {
      console.log('Need auth');
      this.go_login();
    });
  }

  go_login() {
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidEnter() {
    this.try_login();
  }


  try_login() {
    this.rest.try_login().then(value => {
      this.login = true;
      return;
    }, error => {
      console.log('Go to page LoginPage.');
      this.login = false;
      this.go_login();
    });
  }

}
