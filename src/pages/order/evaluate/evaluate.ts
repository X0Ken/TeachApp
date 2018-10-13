import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order, User, Evaluate } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-evaluate',
  templateUrl: 'evaluate.html'
})
export class EvaluatePage {

  evaluate: Evaluate;
  order: Order;
  me: User;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public rest: RestProvider,
  ) {
    this.order = this.params.get("order");
    this.load();
  }

  async load() {
    this.me = await this.rest.get_user_myself();
    let uid;
    if (this.me.id == this.order.payee_id) {
      uid = this.order.payer_id;
    } else {
      uid = this.order.payee_id;
    }
    try {
      this.evaluate = await this.rest.get_user_evaluate(uid, this.order.id);
    } catch (ex) {
      this.evaluate = new Evaluate();
      this.evaluate.user_id = uid;
      this.evaluate.order_id = this.order.id;
      this.evaluate.score = 5;
      this.evaluate.content = "";
    }

  }



  set_ev(t: number) {
    if (this.evaluate.id) {
      return;
    }
    this.evaluate.score = t;
  }

  async submit(){
    this.evaluate = await this.rest.create_user_evaluate(this.evaluate);
  }

}
