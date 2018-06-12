import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { GlobalSettingService } from '../../global';
import { TeacherDetailPage } from '../teacher-detail/teacher-detail';

@Component({
  selector: 'page-teacher-list',
  templateUrl: 'teacher-list.html'
})
export class TeacherListPage {

  items: Array<any>;
  uri: string = '/teachers';

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController,
    public globalSetting: GlobalSettingService) {
    this.initializeItems();
  }

  ionViewDidEnter() {
    //this.load_data();
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
    this.getTeacherList()
  }

  showTeacher(teacher) {
    this.navCtrl.push(TeacherDetailPage, { "teacher": teacher });
  }

  getTeacherList() {
    var url = this.globalSetting.serverAddress + this.uri;
    this.http.get(url)
      .subscribe(data => {
        console.log(data);
        this.items = data['teachers'];

      },
        error => {
          console.error("This line is never called ", error);
        });
  }

}
