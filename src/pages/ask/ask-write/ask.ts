import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AskViewPage } from '../ask-view/ask-view';
import { HttpClient } from '@angular/common/http';
import { GlobalSettingService } from '../../global';
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-ask',
  templateUrl: 'ask.html'
})
export class AskPage {

  pay: number = 0;
  keywords: string = "";
  content: string = "";

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: HttpClient,
    private rest: RestProvider,
    public globalSetting: GlobalSettingService,
    params: NavParams) {
    var question = params.get("question");
    if (question != null) {
      this.pay = question['pay'];
      this.keywords = question['keywords'];
      this.content = question['content'];

    }
  }

  setPay() {
    this.pay = Math.floor(Math.random() * 100);
  }

  showPrompt() {
    var prompt = this.alertCtrl.create({
      title: '设置关键词',
      inputs: [
        {
          name: 'keywords',
          placeholder: '关键词',
          value: this.keywords
        },
      ],
      buttons: [
        {
          text: '确认',
          handler: data => {
            this.keywords = data.keywords;
            console.log('Saved clicked');

            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  submit() {
    var body = {
      'pay': this.pay.toString(),
      'content': this.content,
      'keywords': this.keywords
    };
    this.rest.put_question(body).then(question => {
      this.navCtrl.setRoot(AskViewPage, { 'question': question });
    }, error => {
      console.error("This line is never called ", error);
    })
  }

}
