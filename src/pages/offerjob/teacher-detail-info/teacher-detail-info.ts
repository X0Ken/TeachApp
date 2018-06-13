import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-teacher-detail-info',
  templateUrl: 'teacher-detail-info.html'
})
export class TeacherDetailInfoPage {
  teacher: object = null;

  constructor(public navCtrl: NavController,
    params: NavParams, ) {
    this.teacher = params.get("teacher");
    if (this.teacher == null) {
      this.teacher = {
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
      };
    }
  }

}
