import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TalkPage } from '../../talk/talk'

@Component({
  selector: 'page-answer-show',
  templateUrl: 'answer-show.html'
})
export class AnswerShowPage {

  item: object = null;

  constructor(public navCtrl: NavController, params: NavParams) {
    this.item = params.get("item");
  }

  talk() {
    this.navCtrl.push(TalkPage, {
      "receiver_id": this.item['asker'],
      "talk_type": "question"
    });
  }

}
