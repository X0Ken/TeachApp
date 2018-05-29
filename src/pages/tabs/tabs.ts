import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { OfferJobPage } from '../offerjob/offerjob';
import { FindJobPage } from '../findjob/findjob';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = OfferJobPage;
  tab4Root = FindJobPage;
  tab5Root = UserPage;

  constructor() {

  }
}
