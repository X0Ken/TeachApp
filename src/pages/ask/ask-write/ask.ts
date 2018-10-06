import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AskViewPage } from '../ask-view/ask-view';
import { RestProvider } from '../../../providers/rest/rest';

import { ImagePicker } from '@ionic-native/image-picker';
import { Question } from '../../models';


@Component({
  selector: 'page-ask',
  templateUrl: 'ask.html'
})
export class AskPage {

  question: Question;
  attachments: string[];

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private rest: RestProvider,
    private imagePicker: ImagePicker,
    params: NavParams) {
    this.attachments = [];
    this.question = params.get("question");
    console.log("question:", this.question);
    if (this.question == null) {
      this.question = new Question();
      this.question.attachments = "";
    }
    console.log("question:", this.question);
    this.update_attchments();
  }

  update_attchments() {
    this.attachments = [];
    for (let att of this.question.attachments.split(',')) {
      att = att.trim()
      if (att.length > 0) {
        this.attachments.push(this.rest.get_image_path(att));
      }
    }
  }

  select_image() {
    let options = {
      maximumImagesCount: 1,//选择一张图片
      width: 800,
      height: 800,
      quality: 80
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.rest.uploadImg(results[i]).then(att => {
          this.question.attachments = this.question.attachments + "," + att;
          this.update_attchments();
        }, err => {
          console.log('uploadImg error: ' + err);
        });
      }
    }, (err) => {
      console.log('Error: ' + err);
    });
  }

  setPay() {
    this.question.pay = Math.floor(Math.random() * 100);
  }

  showPrompt() {
    var prompt = this.alertCtrl.create({
      title: '设置关键词',
      inputs: [
        {
          name: 'keywords',
          placeholder: '关键词',
          value: this.question.keywords
        },
      ],
      buttons: [
        {
          text: '确认',
          handler: data => {
            this.question.keywords = data.keywords;
            console.log('Saved clicked');

            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  submit() {
    if (this.question.id == null) {
      this.rest.put_question(this.question).then(question => {
        this.navCtrl.setRoot(AskViewPage, { 'question': question });
      }, error => {
        console.error("This line is never called ", error);
      });
    } else {
      this.rest.update_question(this.question).then(question => {
        this.navCtrl.setRoot(AskViewPage, { 'question': question });
      }, error => {
        console.error("This line is never called ", error);
      });
    }
  }

}
