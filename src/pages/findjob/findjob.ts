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
    this.initializeItems();

  }

  ionViewDidEnter() {
    //this.load_data();
    this.loadTeacherInfo();
  }


  initializeItems() {
    this.items = [
      {
        "uuid": "da02d1a4d72a4fe5832509fa9319884b",
        "method": "网络",
        "gender": "男",
        "school": "北京演艺专修学院",
        "highest_education": "本科",
        "pay": "20-30",
        "region": "海淀区",
        "subject": "语文",
        "time": "上午",
        "create_at": "2018-05-28 23:36:02"
      },
      {
        "uuid": "e99465c6b2674c7d8d8431f9f4cf3930",
        "method": "网络",
        "gender": "男",
        "school": "北京演艺专修学院",
        "highest_education": "本科",
        "pay": "20-30",
        "region": "海淀区",
        "subject": "语文",
        "time": "上午",
        "create_at": "2018-05-28 23:36:11"
      },
      {
        "uuid": "2d62e44693fd44b2be4a4220f62239dc",
        "method": "网络",
        "gender": "男",
        "school": "北京演艺专修学院",
        "highest_education": "本科",
        "pay": "20-30",
        "region": "海淀区",
        "subject": "语文",
        "time": "上午",
        "create_at": "2018-05-28 23:37:24"
      }
    ];
    //this.load_data()
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
          console.error("This line is never called ", error);
        });
  }



  load_data() {
    var url = this.globalSetting.serverAddress + this.path;
    this.http.get(url)
      .subscribe(data => {
        console.log(data);
        this.items = (data as any).jobs;
      },
        error => {
          console.error("This line is never called ", error);
          let alert = this.alertCtrl.create({
            title: 'New Friend!',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        });
  }

  go_edit() {
    //this.navCtrl.setRoot(SearchPage);
    this.navCtrl.push(SelfInfoPage);
  }

  go_talk() {
    this.navCtrl.push(TalkPage, { "user": '张三' });
  }

}
