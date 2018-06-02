import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { SearchPage } from '../common/search/search';
import { GlobalSettingService } from '../global';

import { TeacherListPage } from '../offerjob/teacher-list/teacher-list';

@Component({
  selector: 'page-offer-job',
  templateUrl: 'offerjob.html'
})
export class OfferJobPage {
  path: string = '/jobs';
  method: string = '';
  school: string = '';
  region: string = '';
  gender: string = '';
  highest_education: string = '';
  pay: string = '';
  subject: string = '';
  time: string = '';

  constructor(public navCtrl: NavController, public http: HttpClient,
    public globalSetting:GlobalSettingService) {

  }

  goSearchSchool() {
    //this.navCtrl.setRoot(SearchPage);
    this.navCtrl.push(SearchPage, {callback: this.setSchool, 
      items:["北京中国农业大学(西校区)",
      "北京联合大学应用文理学院",
    "北京大学药学院",
    "北京演艺专修学院",
    "北京鲁迅文学院",
    "北京中央财经大学",
    "北京装备指挥技术学院",
    "大连理工大学开发区校区",
    "北京圆明园学院"]});
  }

  goSearchRegion() {
    //this.navCtrl.setRoot(SearchPage);
    this.navCtrl.push(SearchPage, {callback: this.setRegion, 
      items:["朝阳区","丰台区","通州区","延庆县","海淀区","东城区",
      "西城区","石景山区","昌平区","大兴区","房山区","顺义区","平谷区","怀柔区","密云县"]});
  }

  setSchool = (_params) => {
    return new Promise((resolve, reject) => {
      this.school = _params;
      resolve();
    });
   }

   setRegion = (_params) => {
    return new Promise((resolve, reject) => {
      this.region = _params;
      resolve();
    });
   }

   submit(){
    //  this.submitToServer();
    this.navCtrl.push(TeacherListPage);

   }

   submitToServer(){
    var job = {"job":{
      "method": this.method,
      "gender": this.gender,
      "school": this.school,
      "highest_education": this.highest_education,
      "pay": this.pay,
      "region": this.region,
      "subject": this.subject,
      "time": this.time}
     }
     var url = this.globalSetting.serverAddress + this.path;
    this.http.post(url, job)
    .subscribe(data => {
      console.log(data);
    },
    error =>{
      console.error("This line is never called ",error);
    });
   }

}
