import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AskViewPage } from '../ask-view/ask-view';

@Component({
  selector: 'page-ask',
  templateUrl: 'ask.html'
})
export class AskPage {

  pay: number=0;
  keywords: string="";
  context: string="";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  setPay(){
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

  submit(){
    var ask = {
      'pay': this.pay,
      'context': this.context,
      'keywords': this.keywords
    };
    this.navCtrl.push(AskViewPage, {'ask':ask});
  }

}
