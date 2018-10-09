import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { SelfInfoPage } from './self-info/self-info';
import { RestProvider } from '../../providers/rest/rest';
import { TalkJobPage } from '../talk/job/talk';
import { Msg } from '../models';

@Component({
  selector: 'page-find-job',
  templateUrl: 'findjob.html'
})
export class FindJobPage {
  items: Array<any>;
  path: string = '/jobs';
  uri: string = '/teachers';
  context: string = '';
  msgs: Msg[];

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private rest: RestProvider,) {

  }

  ionViewDidEnter() {
    this.loadTeacherInfo();
    this.load_msgs();
  }

  async load_msgs() {
    this.msgs = await this.rest.get_job_last_msg();
    console.log("view: ", this.msgs)
    for (let msg of this.msgs) {
      let u = await this.rest.load_user_info(msg.sender_id);
      msg.sender = u;
    }
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

  async go_talk(msg: Msg) {
    let job = await this.rest.get_teacher_job(msg.type_id);
    this.navCtrl.push(TalkJobPage, {
      "receiver": msg.sender,
      "job": job
    });
  }

}
