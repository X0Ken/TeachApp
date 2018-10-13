import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Evaluate, Teacher } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-evaluate',
  templateUrl: 'evaluate.html'
})
export class ShowEvaluatePage {
  items: Evaluate[];
  teacher: Teacher

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public rest: RestProvider
  ) {
    this.teacher = this.params.get("teacher");
    this.load();
  }

  async load() {
    this.items = await this.rest.list_user_evaluate(this.teacher.id);
    console.log(this.items);
  }

}
