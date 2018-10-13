import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { TalkJobPage } from '../../talk/job/talk'
import { ShowEvaluatePage } from '../evaluate/evaluate'
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
    public modalCtrl: ModalController,
    private rest: RestProvider,
    public toastCtrl: ToastController) {
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
    this.navCtrl.push(ShowEvaluatePage, {
      "teacher": this.teacher
    });
  }
  showDetail() {
    this.navCtrl.push(TeacherDetailInfoPage, {
      "teacher": this.teacher
    });
  }

  async talk() {
    let receiver = await this.rest.load_user_info(this.teacher['id'])
    let me = await this.rest.get_user_myself()
    if (me.id == receiver.id) {
      this.showToast("middle", "不能与自己聊天");
      return;
    }
    this.navCtrl.push(TalkJobPage, {
      "receiver": receiver,
      "job": this.job
    });
  }

  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }


}
