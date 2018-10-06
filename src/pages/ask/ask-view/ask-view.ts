import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AskPage } from '../ask-write/ask';
import { Msg, Question } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';
import { TalkQuestionPage } from '../../talk/question/talk';

@Component({
  selector: 'page-ask-view',
  templateUrl: 'ask-view.html'
})
export class AskViewPage {
  question: Question = null;
  msgs: Msg[];
  attachments: string[];

  constructor(public navCtrl: NavController,
    params: NavParams,
    public rest: RestProvider) {
    this.question = params.get("question");
    this.load_msg();
    this.update_attchments()
  }

  update_attchments() {
    this.attachments = [];
    if (this.question.attachments == null) {
      return;
    }
    for (let att of this.question.attachments.split(',')) {
      att = att.trim()
      if (att.length > 0) {
        this.attachments.push(this.rest.get_image_path(att));
      }
    }
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

