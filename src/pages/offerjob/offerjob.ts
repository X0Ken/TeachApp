import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { SearchPage } from '../common/search/search';

import { TeacherListPage } from '../offerjob/teacher-list/teacher-list';
import { RestProvider } from '../../providers/rest/rest';
import { School, Region } from '../models';
import { SchoolListPage } from '../common/school-list/school-list';
import { RegionListPage } from '../common/region-list/region-list';

@Component({
  selector: 'page-offer-job',
  templateUrl: 'offerjob.html'
})
export class OfferJobPage {
  uri: string = '/teacherjobs';
  method: string = '';
  school: string = '';
  region: string = '';
  gender: string = '';
  highest_education: string = '';
  pay: string = '';
  subject: string = '';
  time: string = '';

  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    private modalCtrl: ModalController) {

  }

  goSearchSchool() {
    let chooseModal = this.modalCtrl.create(SchoolListPage);
    chooseModal.onDidDismiss((item: School) => {
      if (item != null) {
        this.school = item.name;
      }
    });
    chooseModal.present();
  }

  goSearchRegion() {
    let chooseModal = this.modalCtrl.create(RegionListPage);
    chooseModal.onDidDismiss((items: Region[]) => {
      if (items != null) {
        let name = items.map(function (elem) {
          return elem.name;
        }).join("-");
        this.region = name;
      }
    });
    chooseModal.present();
  }

  submit() {
    this.submitToServer();

  }

  submitToServer() {
    var job = {
      "teacherjob": {
        "method": this.method,
        "gender": this.gender,
        "school": this.school,
        "highest_education": this.highest_education,
        "pay": this.pay,
        "region": this.region,
        "subject": this.subject,
        "time": this.time
      }
    }
    this.rest.put_teacher_job(job).then(value => {
      this.navCtrl.push(TeacherListPage, { "job": value });
      console.log("view job: ", value);
    }, error => {
      console.error("This line is never called ", error);
    })
  }

}
