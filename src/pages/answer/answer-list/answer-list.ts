import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AnswerShowPage } from '../answer-show/answer-show'
import { HttpClient } from '@angular/common/http';
import { GlobalSettingService } from '../../global';

@Component({
  selector: 'page-answer-list',
  templateUrl: 'answer-list.html'
})
export class AnswerListPage {
  items: object[];

  constructor(public navCtrl: NavController,
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
    var url = this.globalSetting.serverAddress + '/questions';
    this.http.get(url)
      .subscribe(data => {
        console.log("Get data from server.");
        console.log(data);
        this.items = data['questions'];
      },
        error => {
          console.error("This line is never called ", error);
        });
  }

}
