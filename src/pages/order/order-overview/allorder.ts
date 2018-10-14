import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OrderListPage } from '../order-list/order-list';
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-allorder',
  templateUrl: 'allorder.html'
})
export class AllOrderPage {

  constructor(public navCtrl: NavController,
    public rest: RestProvider) {

  }

  offerJobSelected() {
    this.navCtrl.push(OrderListPage, {
      "order_type": 'offer_job'
    });
  }
  findJobSelected() {
    this.navCtrl.push(OrderListPage, {
      "order_type": 'job'
    });
  }
  askSelected() {
    this.navCtrl.push(OrderListPage, {
      "title": "提问订单",
      "order_type": 'question'
    });
  }
  answerSelected() {
    this.navCtrl.push(OrderListPage, {
      "title": "回答订单",
      "order_type": 'answer'
    });
  }


}
