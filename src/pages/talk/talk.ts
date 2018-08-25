import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CreateJobOrderPage } from '../order/create-job-order/create-job-order';
import { CreateQuestionOrderPage } from '../order/create-question-order/create-question-order';

import { RestProvider } from '../../providers/rest/rest';
import { User } from '../models'

@Component({
  selector: 'page-talk',
  templateUrl: 'talk.html'
})
export class TalkPage {
  receiver: User;
  me: User;
  items: any[];
  content: string = '';
  talk_type: string = "question";
  worker: number;


  @ViewChild('content_view') content_view: any;

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    params: NavParams) {
    var receiver_id = params.get("receiver_id");
    this.talk_type = params.get("talk_type");
    console.log("talk_type", this.talk_type);

    this.load_self_info();
    this.load_receiver_info(receiver_id);
    this.load_msgs(receiver_id);
  }

  async load_self_info() {
    var token = await this.rest.try_login();
    this.me = await this.rest.load_user_info(token['id']);
    console.log("me:", this.me)
  }

  async load_receiver_info(receiver_id) {
    this.receiver = await this.rest.load_user_info(receiver_id);
    console.log("receiver:", this.receiver)
  }

  async load_msgs(receiver_id) {
    this.items = await this.rest.get_msg(receiver_id)
    console.log("msgs:", this.items)
  }

  async pushMessage() {
    let content = this.content;
    if (content == '') {
      return;
    }
    let data = {
      "content": content,
    };
    this.content = "";
    let msg = await this.rest.put_msg(this.receiver.id, data);
    this.autoScroll();
    //this.items.push(msg);
  }

  autoScroll() {
    setTimeout(() => {
      this.content_view.scrollToBottom(300);
    });
  }

  ionViewDidEnter() {
    this.worker = setInterval(() => {
      this.load_msgs(this.receiver.id);
      this.autoScroll();
    }, 500);
  }

  ionViewWillLeave() {
    clearInterval(this.worker);
  }

  goCreateOrder() {
    if (this.talk_type == 'job') {
      this.navCtrl.push(CreateJobOrderPage);
    } else if (this.talk_type == 'question') {
      this.navCtrl.push(CreateQuestionOrderPage);
    } else {
      console.log("talk type error", this.talk_type);
    }
  }

}
