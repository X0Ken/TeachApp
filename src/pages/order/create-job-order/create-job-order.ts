import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Order, User, Job } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';
import { ContactPage } from '../../user/contact/contact';
import { EvaluatePage } from '../evaluate/evaluate';

@Component({
  selector: 'page-create-job-order',
  templateUrl: 'create-job-order.html'
})
export class CreateJobOrderPage {
  role: string;
  order: Order;
  me: User;
  receiver: User;
  job: Job;

  constructor(public navCtrl: NavController,
    public rest: RestProvider,
    public params: NavParams,
    public toastCtrl: ToastController) {
    this.init();
    this.load_data();
  }

  init() {
    this.order = null;
    this.me = null;
    this.receiver = null;
    this.role = null;
    this.job = null;
  }

  async load_data() {

    this.me = await this.rest.get_user_myself()
    this.job = this.params.get("job");
    this.receiver = this.params.get("receiver");

    let order = this.params.get("order");
    if (order == null && this.job != null) {
      try {
        let order = await this.rest.get_order_by_job(this.job.id);
        this.order = order;
      }
      catch (e) {
        console.log('No order found', e);
        let order = new Order();
        order.job = this.job;
        order.number = 1;
        order.unit = "天";
        order.unit_price = 100;
        order.amount = order.number * order.unit_price;
        order.state = null;
        order.type = 'job';
        order.type_id = this.job.id

        if (this.job.provider_id == this.me.id) {
          order.payer_id = this.me.id;
          order.payee_id = this.receiver.id;
        } else {
          order.payer_id = this.receiver.id;
          order.payee_id = this.me.id;
        }
        this.order = order;
      }

      if (this.job.provider_id == this.me.id) {
        this.role = "payer";
      } else {
        this.role = "payee";
      }

    } else if (order != null) {
      this.order = order;
      if (this.order.payer_id == this.me.id) {
        this.role = "payer";
      } else {
        this.role = "payee";
      }
    } else {
      console.log('there was an error');
    }

  }

  inc_num(ev) {
    console.log(ev);
    this.order.number = this.order.number + 1;
  }

  dec_num(ev) {
    console.log(ev);
    this.order.number = this.order.number - 1;
    if (this.order.number < 1) {
      this.order.number = 1;
    }
  }

  calc_price(ev) {
    console.log(ev);
    this.order.amount = this.order.number * this.order.unit_price;
  }

  async createOrder() {
    this.order = await this.rest.create_order(this.order)
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

  go_contact_Page() {
    this.navCtrl.push(ContactPage);
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

  go_evaluate_Page() {
    this.navCtrl.push(EvaluatePage, {
      "order": this.order
    });
  }

}
