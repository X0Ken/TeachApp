import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { GlobalSettingService } from '../global';
import { SelfInfoPage } from './self-info/self-info';
import { TalkPage } from '../talk/talk';

@Component({
  selector: 'page-find-job',
  templateUrl: 'findjob.html'
})
export class FindJobPage {
  items: Array<any>;
  path: string = '/jobs';
  uri: string = '/teachers';
  context: string = '';

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController,
    public globalSetting: GlobalSettingService) {

  }

  ionViewDidEnter() {
    this.loadTeacherInfo();
  }


  loadTeacherInfo() {
    var url = this.globalSetting.serverAddress + this.uri + "/" + this.globalSetting.user['id'];
    this.http.get(url)
      .subscribe(data => {
        console.log("Get teacher init data from server.");
        console.log(data);
        var teacher = data['teacher'];
        this.context = `授课方式: ${teacher['method']},
性别: ${teacher['gender']},
身份证号: ${teacher['idcard']},
地址: ${teacher['region']},
学历: ${teacher['highest_education']},
就读-毕业院校: ${teacher['school']},
专业: ${teacher['school_subject']},
教授科目: ${teacher['subject']},
薪资要求: ${teacher['pay']},
授课时间: ${teacher['time']}`;
      },
        error => {
          console.log(error);
          this.go_edit();
        });
  }

  go_edit() {
    //this.navCtrl.setRoot(SearchPage);
    this.navCtrl.push(SelfInfoPage);
  }

  go_talk() {
    this.navCtrl.push(TalkPage, {
      "user": '张三',
      "talk_type": "job"
    });
  }

}
