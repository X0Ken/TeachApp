import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Msg, User } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';
import { TalkJobPage } from '../job/talk';
import { TalkQuestionPage } from '../question/talk';
import { MsgCheckProvider } from '../../../providers/msg';

@Component({
  selector: 'page-talk-list',
  templateUrl: 'list.html'
})
export class TalkListPage {

  msgs: Msg[];
  me: User;

  constructor(public navCtrl: NavController,
    public msgProvider: MsgCheckProvider,
    private rest: RestProvider) {
    this.load_msgs();
  }

  async load_msgs() {
    var token = await this.rest.try_login();
    this.me = await this.rest.load_user_info(token['id']);

    this.msgs = await this.rest.get_channel_last_msg();
    for (let msg of this.msgs) {
      if (msg.receiver_id != this.me.id) {
        msg.sender = await this.rest.load_user_info(msg.receiver_id);
      } else {
        msg.sender = await this.rest.load_user_info(msg.sender_id);
      }
    }
    console.log("view: ", this.msgs)
  }

  async go_talk(msg: Msg) {
    if (msg.type == 'job') {
      let job = await this.rest.get_teacher_job(msg.type_id);
      this.navCtrl.push(TalkJobPage, {
        "receiver": msg.sender,
        "job": job
      });
    } else {
      let question = await this.rest.get_question(msg.type_id)
      this.navCtrl.push(TalkQuestionPage, {
        "receiver": msg.sender,
        "question": question
      });
    }
  }

}
