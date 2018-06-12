import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AskViewPage } from '../ask-view/ask-view';
import { HttpClient } from '@angular/common/http';
import { GlobalSettingService } from '../../global';

@Component({
  selector: 'page-ask',
  templateUrl: 'ask.html'
})
export class AskPage {

  pay: number = 0;
  keywords: string = "";
  context: string = "";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public http: HttpClient,
    public globalSetting: GlobalSettingService) {

  }

  setPay() {
    this.pay = Math.floor(Math.random() * 100);
  }

  showPrompt() {
    var prompt = this.alertCtrl.create({
      title: '设置关键词',
      message: "多个关键词可以用空格分开",
      inputs: [
        {
          name: 'keywords',
          placeholder: '关键词',
          value: this.keywords
        },
      ],
      buttons: [
        {
          text: '保存',
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
      "question": {
        'pay': this.pay.toString(),
        'context': this.context,
        'keywords': this.keywords
      }
    };
    var url = this.globalSetting.serverAddress + '/questions';
    this.http.post(url, body)
      .subscribe(data => {
        console.log("Load data from server");
        console.log(data);
        var question = data['question'];
        this.navCtrl.push(AskViewPage, { 'question': question });
      },
        error => {
          console.error("This line is never called ", error);
        });
  }

}
