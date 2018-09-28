import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestProvider } from '../../../providers/rest/rest';
import { User } from '../../models'
import { CreateJobOrderPage } from '../../order/create-job-order/create-job-order';

@Component({
  selector: 'page-talk-job',
  templateUrl: 'talk.html'
})
export class TalkJobPage {
  receiver: User;
  me: User;
  items: any[];
  content: string = '';
  worker: number;
  job: any;


  @ViewChild('content_view') content_view: any;

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    params: NavParams) {
    this.receiver = params.get("receiver");
    this.job = params.get("job");
    this.items = [];
    this.load_self_info();
    this.load_msgs();
  }

  async load_self_info() {
    var token = await this.rest.try_login();
    this.me = await this.rest.load_user_info(token['id']);
    console.log("me:", this.me)
  }

  async load_msgs() {
    let items = await this.rest.get_job_user_msg(this.job['id'], this.receiver.id);
    // console.log("msgs:", this.items)
    let new_items = [];
    for (let item of items) {
      let eq = false;
      for (let i of this.items) {
        if (i.id == item.id) {
          eq = true;
          break;
        }
      }
      if (!eq) {
        new_items.push(item);
      }
    }
    this.items.push(...new_items);
    if (new_items.length > 0) {
      this.autoScroll();
    }
  }

  async pushMessage() {
    let content = this.content;
    if (content == '') {
      return;
    }
    this.content = "";
    await this.rest.put_job_user_msg(this.job['id'], this.receiver.id, content);
    //this.items.push(msg);
  }

  autoScroll() {
    setTimeout(() => {
      this.content_view.scrollToBottom(300);
    });
  }

  ionViewDidEnter() {
    this.worker = setInterval(() => {
      this.load_msgs();
    }, 500);
  }

  ionViewWillLeave() {
    clearInterval(this.worker);
  }

  goCreateOrder() {
    this.navCtrl.push(CreateJobOrderPage);
  }

}
