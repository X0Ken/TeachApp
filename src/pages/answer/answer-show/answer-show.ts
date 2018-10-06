import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TalkQuestionPage } from '../../talk/question/talk';
import { RestProvider } from '../../../providers/rest/rest';
import { Question } from '../../models';

@Component({
  selector: 'page-answer-show',
  templateUrl: 'answer-show.html'
})
export class AnswerShowPage {

  question: Question;
  attachments: string[];

  constructor(public navCtrl: NavController, params: NavParams,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    this.question = params.get("question");
    this.update_attchments();
  }

  update_attchments() {
    this.attachments = [];
    for (let att of this.question.attachments.split(',')) {
      att = att.trim()
      if (att.length > 0) {
        this.attachments.push(this.rest.get_image_path(att));
      }
    }
  }

  async talk() {
    let receiver = await this.rest.load_user_info(this.question['asker_id'])
    let me = await this.rest.get_user_myself()
    if (me.id == receiver.id){
      this.showToast("middle", "不能与自己聊天");
      return;
    }
    console.log("receiver:  ", receiver)
    this.navCtrl.push(TalkQuestionPage, {
      "receiver": receiver,
      "question": this.question
    });
  }

  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

}
