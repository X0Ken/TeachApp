import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { SearchPage } from '../../common/search/search';
import { RestProvider } from '../../../providers/rest/rest';
import { SchoolListPage } from '../../common/school-list/school-list';
import { School, Region } from '../../models';
import { RegionListPage } from '../../common/region-list/region-list';

@Component({
  selector: 'page-self-info',
  templateUrl: 'self-info.html'
})
export class SelfInfoPage {
  region: string = "";
  school: string = "";
  school_subject: string = "";
  method: string = "";
  gender: string = "";
  idcard: string = "";
  highest_education: string = "";
  subject: string = "";
  pay: string = "";
  time: string = "";
  self_evaluate: string = "";

  uri = "/teachers"


  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private rest: RestProvider) {
    this.initializeItems();

  }

  initializeItems() {
    this.getTeacherInfo();
  }

  async getTeacherInfo() {
    var user = await this.rest.try_login()
    this.rest.load_teacher_info(user['id']).then(teacher => {
      this.region = teacher['region'];
      this.school = teacher['school'];
      this.school_subject = teacher['school_subject'];
      this.method = teacher['method'];
      this.gender = teacher['gender'];
      this.idcard = teacher['idcard'];
      this.highest_education = teacher['highest_education'];
      this.subject = teacher['subject'];
      this.pay = teacher['pay'];
      this.time = teacher['time'];
      this.self_evaluate = teacher['self_evaluate'];
    }, error => {
      console.error("This line is never called ", error);
    });
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

  goSearchSchoolSubject() {
    //this.navCtrl.setRoot(SearchPage);
    this.navCtrl.push(SearchPage, {
      callback: this.setSchoolSubject,
      items: [
        "文学",
        "地理",
        "生物",
        "计算机科学",
        "体育",
        "经贸"
      ]
    });
  }

  setSchoolSubject = (_params) => {
    return new Promise((resolve, reject) => {
      this.school_subject = _params;
      resolve();
    });
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

  check() {
    return 0;
  }

  update_info() {
    if (this.check() < 0) {
      return;
    }

    var teacher = {
      region: this.region,
      school: this.school,
      school_subject: this.school_subject,
      method: this.method,
      gender: this.gender,
      idcard: this.idcard,
      highest_education: this.highest_education,
      subject: this.subject,
      pay: this.pay,
      time: this.time,
      self_evaluate: this.self_evaluate
    };

    this.rest.update_teacher_info(teacher).then(value => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });

  }

  go_back() {
    this.update_info();
    //this.navCtrl.pop();
  }

}
