import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AnswerShowPage } from '../answer-show/answer-show'

@Component({
  selector: 'page-answer-list',
  templateUrl: 'answer-list.html'
})
export class AnswerListPage {
  items: string[];

  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }

  initializeItems() {
      this.items = [
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题',
        '一个求助的问题'
      ];
  }

  itemSelected(item){
    this.navCtrl.push(AnswerShowPage, {"item": item});
  }

}
