import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CreateOrderPage } from '../order/create-order/create-order';

@Component({
  selector: 'page-talk',
  templateUrl: 'talk.html'
})
export class TalkPage {
  user: string = '';
  user_id: string = '1';
  items: any[];
  msg: string = '';
  @ViewChild('content') content: any;

  constructor(public navCtrl: NavController, params: NavParams) {
    this.user = params.get("user");
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      {
        "user_id": "1",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/user1.jpg"
      },
      {
        "user_id": "2",
        "msg": "这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息。",
        "user_pic": "assets/imgs/user2.jpg"
      },
      {
        "user_id": "1",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/user1.jpg"
      },
      {
        "user_id": "1",
        "msg": "这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息。",
        "user_pic": "assets/imgs/user1.jpg"
      },
      {
        "user_id": "2",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/user2.jpg"
      },
      {
        "user_id": "2",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/user2.jpg"
      },
      {
        "user_id": "1",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/user1.jpg"
      },
      {
        "user_id": "2",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/user2.jpg"
      },
      {
        "user_id": "1",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/user1.jpg"
      }
    ];
  }

  pushMessage() {
    let msg = this.msg;
    //this.content.scrollToBottom(300);
    if (msg == '') {
      return;
    }
    this.items.push({
      "user_id": "1",
      "msg": msg,
      "user_pic": "assets/imgs/user1.jpg"
    });
    this.msg = "";
    this.autoScroll();

  }

  autoScroll() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    });
  }

  ionViewDidEnter() {
    this.autoScroll();
  }

  goCreateOrder() {
    this.navCtrl.push(CreateOrderPage);
  }

}
