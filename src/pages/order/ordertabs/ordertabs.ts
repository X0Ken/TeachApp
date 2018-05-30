import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OrderDonePage } from '../order-done/order-done';
import { OrderGoingPage } from '../order-going/order-going';
import { OrderListAllPage } from '../order-list-all/order-list-all';
import { OrderNeedConfirmedPage } from '../order-need-confirmed/order-need-confirmed';

@Component({
  templateUrl: 'ordertabs.html'
})
export class OrderTabsPage {

  tab1Root = OrderListAllPage;
  tab2Root = OrderNeedConfirmedPage;
  tab3Root = OrderGoingPage;
  tab4Root = OrderDonePage;

  title: string = '';

  constructor(public navCtrl: NavController, params: NavParams) {
    this.title = params.get("title");

  }
}
