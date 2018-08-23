import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AnswerShowPage } from '../answer-show/answer-show'
import { HttpClient } from '@angular/common/http';
import { GlobalSettingService } from '../../global';

import { RestProvider } from '../../../providers/rest/rest';


@Component({
  selector: 'page-answer-list',
  templateUrl: 'answer-list.html'
})
export class AnswerListPage {
  items: object[];

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    public http: HttpClient,
    public globalSetting: GlobalSettingService) {
    this.initializeItems();
  }

  initializeItems() {
    this.loadQuestion();
  }

  itemSelected(item) {
    console.log(item);
    this.navCtrl.push(AnswerShowPage, { "item": item });
  }

  loadQuestion() {
    this.rest.load_questions().then((items) => {
      this.items = items;
    }, error => {
      console.error("This line is never called ", error);
    })
  }

}
