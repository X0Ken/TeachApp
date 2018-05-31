import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { OfferJobPage } from '../offerjob/offerjob';
import { FindJobPage } from '../findjob/findjob';
import { UserPage } from '../user/user';
import { AskPage } from '../ask/ask-write/ask';
import { AnswerListPage } from '../answer/answer-list/answer-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AskPage;
  tab2Root = AnswerListPage;
  tab3Root = OfferJobPage;
  tab4Root = FindJobPage;
  tab5Root = UserPage;

  constructor() {

  }
}
