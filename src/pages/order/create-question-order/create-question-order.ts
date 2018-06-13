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

  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

}
