import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { OrderTabsPage } from '../ordertabs/ordertabs';

@Component({
  selector: 'page-allorder',
  templateUrl: 'allorder.html'
})
export class AllOrderPage {
  path: string = 'http://47.104.87.111:8888/jobs';

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  offerJobSelected() {
    this.navCtrl.push(OrderTabsPage, {"title": "找家教订单"});
  }
  findJobSelected() {
    this.navCtrl.push(OrderTabsPage, {"title": "当家教订单"});
  }
  askSelected() {
    this.navCtrl.push(OrderTabsPage, {"title": "提问订单"});
  }
  answerSelected() {
    this.navCtrl.push(OrderTabsPage, {"title": "回答订单"});
  }


}
