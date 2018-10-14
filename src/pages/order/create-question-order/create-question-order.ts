import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ContactPage } from '../../user/contact/contact';
import { Order, User, Question } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-create-question-order',
  templateUrl: 'create-question-order.html'
})
export class CreateQuestionOrderPage {
  role: string;
  order: Order;
  me: User;
  receiver: User;
  question: Question;
  pay: number;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    this.init();
    this.load_data()
  }

  init() {
    this.order = null;
    this.me = null;
    this.receiver = null;
    this.role = null;
    this.question = null;
    this.pay = null;
  }

  async load_data() {

    this.me = await this.rest.get_user_myself()
    this.question = this.params.get("question");
    this.receiver = this.params.get("receiver");

    let order = this.params.get("order");
    if (order == null && this.question != null) {
      try {
        let order = await this.rest.get_order_by_question(this.question.id);
        this.order = order;
      }
      catch (e) {
        console.log('there was an error', e);
      }

      if (this.question.asker_id == this.me.id) {
        this.role = "payer";
      } else {
        this.role = "payee";
      }
      this.pay = this.question.pay;

    } else if (order != null) {
      this.order = order;
      if (this.order.payer_id == this.me.id) {
        this.role = "payer";
      } else {
        this.role = "payee";
      }
      this.pay = this.order.amount;
    } else {
      console.log('there was an error');
    }

  }

  async createOrder() {
    let order = new Order();
    if (this.question.asker_id == this.me.id) {
      order.payer_id = this.me.id;
      order.payee_id = this.receiver.id;
    } else if (this.question.asker_id == this.receiver.id) {
      order.payer_id = this.receiver.id;
      order.payee_id = this.me.id;
    }
    order.number = 1;
    order.amount = order.unit_price = this.question.pay;
    order.type = "question"
    order.unit = "次";
    order.type_id = this.question.id;
    this.order = await this.rest.create_order(order)
  }

  goBack() {
    this.navCtrl.pop();
  }

  async acceptOrder() {
    try {
      let order = await this.rest.payed_order(this.order.id);
      this.order = order;
    }
    catch (e) {
      console.log('there was an error', e);
    }
  }

  async rejectOrder() {
    try {
      let order = await this.rest.reject_order(this.order.id);
      this.order = order;
    }
    catch (e) {
      console.log('there was an error', e);
    }
  }

  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  go_contact_Page() {
    this.navCtrl.push(ContactPage);
  }

}
