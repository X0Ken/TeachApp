import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GlobalSettingService } from '../../global';
import { HttpClient } from '@angular/common/http';
import { TalkPage } from '../../talk/talk'
import { EvaluatePage } from '../evaluate/evaluate'
import { TeacherDetailInfoPage } from '../teacher-detail-info/teacher-detail-info'
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-teacher-detail',
  templateUrl: 'teacher-detail.html'
})
export class TeacherDetailPage {
  uri = "/teachers"
  teacher: Object = {
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

  constructor(public navCtrl: NavController, params: NavParams,
    public globalSetting: GlobalSettingService,
    public modalCtrl: ModalController,
    private rest: RestProvider,
    public http: HttpClient) {
    var teacher = params.get("teacher");
    this.getTeacherDetail(teacher['user_id']);
  }

  getTeacherDetail(teacher_id) {
    this.rest.load_teacher_info(teacher_id).then(value => {
      this.teacher = value;
    }, error => {
      console.error("This line is never called ", error);
    });
  }

  showEvaluate() {
    this.navCtrl.push(EvaluatePage);
  }
  showDetail() {
    this.navCtrl.push(TeacherDetailInfoPage, {
      "teacher": this.teacher
    });
  }

  talk() {
    this.navCtrl.push(TalkPage, {
      "user": '张三',
      "talk_type": "job"
    });
  }

}
