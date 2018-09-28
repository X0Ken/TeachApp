import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GlobalSettingService } from '../../global';
import { HttpClient } from '@angular/common/http';
import { TalkJobPage } from '../../talk/job/talk'
import { EvaluatePage } from '../evaluate/evaluate'
import { TeacherDetailInfoPage } from '../teacher-detail-info/teacher-detail-info'
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-teacher-detail',
  templateUrl: 'teacher-detail.html'
})
export class TeacherDetailPage {
  teacher: any;
  job: any;

  constructor(public navCtrl: NavController, params: NavParams,
    public globalSetting: GlobalSettingService,
    public modalCtrl: ModalController,
    private rest: RestProvider,
    public http: HttpClient) {
    var teacher = params.get("teacher");
    this.job = params.get("job");
    this.getTeacherDetail(teacher['id']);
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

  async talk() {
    let receiver = await this.rest.load_user_info(this.teacher['id'])
    this.navCtrl.push(TalkJobPage, {
      "receiver": receiver,
      "job": this.job
    });
  }

}
