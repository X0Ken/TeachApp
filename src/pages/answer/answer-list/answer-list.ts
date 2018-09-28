import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AnswerShowPage } from '../answer-show/answer-show'

import { RestProvider } from '../../../providers/rest/rest';


@Component({
  selector: 'page-answer-list',
  templateUrl: 'answer-list.html'
})
export class AnswerListPage {
  items: object[];
  keyword: string;

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    private params: NavParams) {
    this.keyword = this.params.get("keyword");
    this.loadQuestion();
  }

  itemSelected(item) {
    console.log(item);
    this.navCtrl.push(AnswerShowPage, { "item": item });
  }

  loadQuestion() {
    this.rest.load_question_by_key(this.keyword).then((items) => {
      this.items = items;
    }, error => {
      console.error("This line is never called ", error);
    })
  }

}
