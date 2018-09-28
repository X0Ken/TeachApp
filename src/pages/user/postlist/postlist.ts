import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RestProvider } from '../../../providers/rest/rest';
import { PostItem } from '../../models';
import { AskViewPage } from '../../ask/ask-view/ask-view';
import { TeacherListPage } from '../../offerjob/teacher-list/teacher-list';

@Component({
  selector: 'page-postlist',
  templateUrl: 'postlist.html'
})
export class PostListPage {
  items: PostItem[]

  constructor(public navCtrl: NavController,
    private rest: RestProvider) {
    this.items = [];
    this.get_post_list();
  }

  async get_post_list() {
    var quesitons = await this.rest.load_my_question();
    for (var q of quesitons) {
      this.items.push({
        "title": q['keywords'] + "：" + q['content'],
        "type": "question",
        "type_id": q['id'],
        "question": q,
        "job": null
      })
    }

    var jobs = await this.rest.load_my_teacher_jobs();
    for (var j of jobs) {
      this.items.push({
        "title": j['subject'] + "-" + j['method'] + "-" + j['rejion'],
        "type": "teacherjob",
        "type_id": j['id'],
        "question": null,
        "job": j
      })
    }
  }

  itemSelected(item: PostItem) {
    if (item.type == 'teacherjob') {
      this.navCtrl.push(TeacherListPage);
    } else if (item.type == 'question') {
      this.navCtrl.push(AskViewPage, { 'question': item.question });
    } else {
      console.log("Error type!");
    }

  }

}
