import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
        "user_pic": "assets/imgs/avatar-finn.jpg"
      },
      {
        "user_id": "2",
        "msg": "这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息。",
        "user_pic": "assets/imgs/avatar-finn.jpg"
      },
      {
        "user_id": "1",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/avatar-finn.jpg"
      },
      {
        "user_id": "1",
        "msg": "这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息，这是一条消息。",
        "user_pic": "assets/imgs/avatar-finn.jpg"
      },
      {
        "user_id": "2",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/avatar-finn.jpg"
      },
      {
        "user_id": "2",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/avatar-finn.jpg"
      },
      {
        "user_id": "1",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/avatar-finn.jpg"
      },
      {
        "user_id": "2",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/avatar-finn.jpg"
      },
      {
        "user_id": "1",
        "msg": "这是一条消息",
        "user_pic": "assets/imgs/avatar-finn.jpg"
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
      "user_pic": "assets/imgs/avatar-finn.jpg"
    });
    this.msg = "";
    this.autoScroll();
    
  }

  autoScroll() {
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    });
}

  //scrolls to bottom whenever the page has loaded
  ionViewDidEnter(){
    this.content.scrollToBottom(300);//300ms animation speed
  }

}
