import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeacherDetailPage } from '../teacher-detail/teacher-detail';
import { RestProvider } from '../../../providers/rest/rest';
import { Job } from '../../models';

@Component({
  selector: 'page-teacher-list',
  templateUrl: 'teacher-list.html'
})
export class TeacherListPage {

  items: Array<any>;
  job: Job;

  constructor(public navCtrl: NavController,
    params: NavParams,
    private rest: RestProvider) {
    this.job = params.get("job");
    this.initializeItems();
  }

  ionViewDidEnter() {
    //this.load_data();
  }


  initializeItems() {
    this.items = [];
    this.getTeacherList()
  }

  showTeacher(teacher) {
    this.navCtrl.push(TeacherDetailPage, {
      "teacher": teacher,
      "job": this.job
    });
  }

  getTeacherList() {
    this.rest.list_teacher_by_job(this.job.id).then((value) => {
      this.items = value;
    }, error => {
      console.log(error);
    })
  }
}
