import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalSettingService } from '../../global';
import { HttpClient } from '@angular/common/http';

import { SearchPage } from '../../common/search/search';

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


  constructor(public navCtrl: NavController, public globalSetting: GlobalSettingService,
    public http: HttpClient) {
    this.initializeItems();

  }

  initializeItems() {
    this.getTeacherInfo();
  }

  getTeacherInfo() {
    var url = this.globalSetting.serverAddress + this.uri + "/" + this.globalSetting.user['id'];
    this.http.get(url)
      .subscribe(data => {
        console.log("Get teacher init data from server.");
        console.log(data);
        var teacher = data['teacher'];
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
      },
        error => {
          console.error("This line is never called ", error);
        });
  }

  goSearchSchool() {
    //this.navCtrl.setRoot(SearchPage);
    this.navCtrl.push(SearchPage, {
      callback: this.setSchool,
      items: ["北京中国农业大学(西校区)",
        "北京联合大学应用文理学院",
        "北京大学药学院",
        "北京演艺专修学院",
        "北京鲁迅文学院",
        "北京中央财经大学",
        "北京装备指挥技术学院",
        "大连理工大学开发区校区",
        "北京圆明园学院"]
    });
  }



  setSchool = (_params) => {
    return new Promise((resolve, reject) => {
      this.school = _params;
      resolve();
    });
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
    //this.navCtrl.setRoot(SearchPage);
    this.navCtrl.push(SearchPage, {
      callback: this.setRegion,
      items: ["朝阳区", "丰台区", "通州区", "延庆县", "海淀区", "东城区",
        "西城区", "石景山区", "昌平区", "大兴区", "房山区", "顺义区", "平谷区", "怀柔区", "密云县"]
    });
  }

  setRegion = (_params) => {
    return new Promise((resolve, reject) => {
      this.region = _params;
      resolve();
    });
  }

  check() {
    return 0;
  }

  update_info() {
    if (this.check() < 0) {
      return;
    }

    var body = {
      "teacher": {
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
      }
    };
    var token_id = this.globalSetting.user['token_id'];
    console.log("log  token id");
    console.log(token_id);

    console.log("post teacher data to server.");
    var url = this.globalSetting.serverAddress + this.uri;
    this.http.post(url, body, {
      headers: { "token-id": token_id }
    })
      .subscribe(data => {
        console.log("Get teacher data from server.");
        console.log(data);
        this.globalSetting.teacher = data['teacher'];

        this.navCtrl.pop();
      },
        error => {
          console.error("This line is never called ", error);
        });
  }

  go_back() {
    this.update_info();
    //this.navCtrl.pop();
  }

}
