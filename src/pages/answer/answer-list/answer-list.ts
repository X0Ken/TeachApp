import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AnswerShowPage } from '../answer-show/answer-show'

import { RestProvider } from '../../../providers/rest/rest';
import { Question } from '../../models';


@Component({
  selector: 'page-answer-list',
  templateUrl: 'answer-list.html'
})
export class AnswerListPage {
  items: Question[];
  keyword: string;

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    private params: NavParams) {
    this.keyword = this.params.get("keyword");
    this.loadQuestion();
  }

  itemSelected(question:Question) {
    console.log(question);
    this.navCtrl.push(AnswerShowPage, { "question": question });
  }

  loadQuestion() {
    this.rest.load_question_by_key(this.keyword).then((items) => {
      this.items = items;
    }, error => {
      console.error("This line is never called ", error);
    })
  }

}
