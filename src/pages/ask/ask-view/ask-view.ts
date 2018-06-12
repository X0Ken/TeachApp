import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TalkPage } from '../../talk/talk'

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

}

