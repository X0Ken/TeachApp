import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-create-question-order',
  templateUrl: 'create-question-order.html'
})
export class CreateQuestionOrderPage {

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController) {

  }

  goBack() {
    this.navCtrl.pop();
  }

  acceptOrder() {
    this.showToast('middle', "您已确认支付订单");
    this.goBack();
  }
  rejectOrder() {
    this.showToast('middle', "您已拒绝支付订单");
    this.goBack();
  }

  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

}
