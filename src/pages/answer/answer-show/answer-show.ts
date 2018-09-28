import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TalkQuestionPage } from '../../talk/question/talk';
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-answer-show',
  templateUrl: 'answer-show.html'
})
export class AnswerShowPage {

  item: object = null;

  constructor(public navCtrl: NavController, params: NavParams,
    public rest: RestProvider) {
    this.item = params.get("item");
  }

  async talk() {
    let receiver = await this.rest.load_user_info(this.item['asker_id'])
    console.log("receiver:  ", receiver)
    this.navCtrl.push(TalkQuestionPage, {
      "receiver": receiver,
      "question": this.item
    });
  }

}
