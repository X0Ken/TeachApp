import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-create-job-order',
  templateUrl: 'create-job-order.html'
})
export class CreateJobOrderPage {
  unit: string = "小时";
  unit_price: number = 20;
  unit_num: number = 1;
  price: number = 20;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController) {

  }

  inc_num(ev) {
    console.log(ev);
    this.unit_num = this.unit_num + 1;
  }

  dec_num(ev) {
    console.log(ev);
    this.unit_num = this.unit_num - 1;
    if (this.unit_num < 1) {
      this.unit_num = 1;
    }
  }

  calc_price(ev) {
    console.log(ev);
    this.price = this.unit_price * this.unit_num;
  }

  payForOrder() {
    this.showToast('middle', "您生成了一个订单");
    this.goBack();
  }

  sendOrder() {
    this.showToast('middle', "您发送了一个订单");
    this.goBack();
  }

  goBack() {
    this.navCtrl.pop();
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
