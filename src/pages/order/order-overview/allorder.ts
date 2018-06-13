import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { OrderListPage } from '../order-list/order-list';

@Component({
  selector: 'page-allorder',
  templateUrl: 'allorder.html'
})
export class AllOrderPage {
  path: string = 'http://47.104.87.111:8888/jobs';

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  offerJobSelected() {
    this.navCtrl.push(OrderListPage, {
      "title": "找家教订单",
      "order_type": 'findTeacher'
    });
  }
  findJobSelected() {
    this.navCtrl.push(OrderListPage, { "title": "当家教订单" });
  }
  askSelected() {
    this.navCtrl.push(OrderListPage, {
      "title": "提问订单",
      "order_type": 'question'
    });
  }
  answerSelected() {
    this.navCtrl.push(OrderListPage, { "title": "回答订单" });
  }


}
