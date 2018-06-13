import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TalkPage } from '../../talk/talk'
import { AskPage } from '../ask-write/ask';

@Component({
  selector: 'page-ask-view',
  templateUrl: 'ask-view.html'
})
export class AskViewPage {
  question: object = null;

  constructor(public navCtrl: NavController, params: NavParams) {
    this.question = params.get("question");
  }

  talk() {
    this.navCtrl.push(TalkPage, { "user": '张三' });
  }

  goEdit() {
    this.navCtrl.setRoot(AskPage, { 'question': this.question });
  }

}

