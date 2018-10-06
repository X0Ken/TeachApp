import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeacherDetailPage } from '../teacher-detail/teacher-detail';
import { RestProvider } from '../../../providers/rest/rest';
import { Job, Teacher } from '../../models';

@Component({
  selector: 'page-teacher-list',
  templateUrl: 'teacher-list.html'
})
export class TeacherListPage {

  items: Teacher[];
  job: Job;
  order_by: string = 'score';
  order_direction: number = 1;

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

  sort_by_score() {
    if (this.order_by == 'score') {
      this.order_direction = -this.order_direction;
    } else {
      this.order_by = 'score'
    }
    if (this.order_direction == 1) {
      this.items.sort(function (a, b) { return b.score - a.score });
    } else if (this.order_direction == -1) {
      this.items.sort(function (a, b) { return a.score - b.score });
    } else {
      console.log("sort_by_score failed");
    }

  }

  sort_by_price() {
    if (this.order_by == 'price') {
      this.order_direction = -this.order_direction;
    } else {
      this.order_by = 'price'
    }
    if (this.order_direction == 1) {
      this.items.sort(function (a, b) { return b.pay - a.pay });
    } else if (this.order_direction == -1) {
      this.items.sort(function (a, b) { return a.pay - b.pay });
    } else {
      console.log("sort_by_price failed");
    }

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
