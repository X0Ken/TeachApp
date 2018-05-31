import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-answer-show',
  templateUrl: 'answer-show.html'
})
export class AnswerShowPage {

  item: string='';

  constructor(public navCtrl: NavController, params: NavParams) {
    this.item = params.get("item");

  }

}
