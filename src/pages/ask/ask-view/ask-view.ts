import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AskPage } from '../ask-write/ask';
import { Msg } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';
import { TalkQuestionPage } from '../../talk/question/talk';

@Component({
  selector: 'page-ask-view',
  templateUrl: 'ask-view.html'
})
export class AskViewPage {
  question: object = null;
  msgs: Msg[];

  constructor(public navCtrl: NavController,
    params: NavParams,
    public rest: RestProvider) {
    this.question = params.get("question");
    this.load_msg();
  }

  talk(m: Msg) {
    this.navCtrl.push(TalkQuestionPage, {
      "receiver": m.sender,
      "question": this.question,
    });
  }

  async load_msg() {
    this.msgs = await this.rest.get_question_last_msg(this.question['id']);
    console.log("view: ", this.msgs)
    for (let msg of this.msgs) {
      let u = await this.rest.load_user_info(msg.sender_id);
      msg.sender = u;
    }
  }

  goEdit() {
    this.navCtrl.setRoot(AskPage, { 'question': this.question });
  }

}

