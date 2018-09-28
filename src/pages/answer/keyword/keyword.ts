import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnswerKeywords } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';
import { AnswerListPage } from '../answer-list/answer-list';

@Component({
  selector: 'page-page-answer-keyword',
  templateUrl: 'keyword.html'
})
export class AnswerKeywordPage {

  keywords: AnswerKeywords[];
  view_state: string;
  input_key: string;

  constructor(public navCtrl: NavController,
    private rest: RestProvider) {
    this.keywords = [];
    this.view_state = 'view';
    this.input_key = '';
    this.load_keys();
  }

  async load_keys() {
    this.keywords = [];
    let keys = await this.rest.load_answer_keywords();
    this.keywords.push(...keys)
  }

  add_view() {
    this.input_key = '';
    this.view_state = 'insert';
  }

  delete_view() {
    this.unselect_all()
    this.view_state = 'delete';
  }

  async add_key() {
    let k = this.input_key.trim()
    this.view_state = 'view';
    if (k.length < 1) {
      return;
    }
    await this.rest.add_answer_keywords({
      "keyword": k
    })
    await this.load_keys();
  }

  async rm_keys() {
    for (let k of this.keywords) {
      await this.rest.delete_answer_keyword(k.id);
    }
    await this.load_keys();
    this.view_state = 'view';
  }

  unselect_all() {
    for (let k of this.keywords) {
      k.selected = false;
    }
  }

  itemSelected(k: AnswerKeywords) {
    this.navCtrl.push(AnswerListPage, { "keyword": k.keyword });
  }



}
