import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { GlobalSettingService } from '../global';
import { SelfInfoPage } from './self-info/self-info';
import { TalkPage } from '../talk/talk';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-find-job',
  templateUrl: 'findjob.html'
})
export class FindJobPage {
  items: Array<any>;
  path: string = '/jobs';
  uri: string = '/teachers';
  context: string = '';

  constructor(public navCtrl: NavController,
    public http: HttpClient, public alertCtrl: AlertController,
    private rest: RestProvider,
    public globalSetting: GlobalSettingService) {

  }

  ionViewDidEnter() {
    this.loadTeacherInfo();
  }


  async loadTeacherInfo() {
    var user = await this.rest.try_login()
    this.rest.load_teacher_info(user['id']).then(teacher => {
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
    }, error => {
      console.log(error);
      this.go_edit();
    })
  }

  go_edit() {
    this.navCtrl.push(SelfInfoPage);
  }

  go_talk() {
    this.navCtrl.push(TalkPage, {
      "receiver_id": 2,
      "talk_type": "job"
    });
  }

}
