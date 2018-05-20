import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { OfferJobPage } from '../offerjob/offerjob';
import { FindJobPage } from '../findjob/findjob';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = FindJobPage;
  tab4Root = OfferJobPage;
  tab5Root = AboutPage;

  constructor() {

  }
}
