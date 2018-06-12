import { Component, ViewChild } from '@angular/core';
import { Tabs, Tab } from 'ionic-angular';

import { OfferJobPage } from '../offerjob/offerjob';
import { FindJobPage } from '../findjob/findjob';
import { UserPage } from '../user/user';
import { AskPage } from '../ask/ask-write/ask';
import { AnswerListPage } from '../answer/answer-list/answer-list';

import { GlobalSettingService } from '../global';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AskPage;
  tab2Root = AnswerListPage;
  tab3Root = OfferJobPage;
  tab4Root = FindJobPage;
  tab5Root = UserPage;

  user: object = null;

  constructor(private globalSetting: GlobalSettingService,
    private http: HttpClient,
    private storage: Storage) {
    this.load_user()

  }

  @ViewChild('tootTabs') tabRef: Tabs;

  tabChange(tab: Tab) {
    var selectedIndex = tab.index;
    console.log(selectedIndex);
    //index equals 0/other to add/remove tab home click event 
    if (this.globalSetting.user == null) {
      this.tabRef.select(4);
    }
  }

  load_user() {
    console.log('GlobalSetting.user');
    console.log(this.globalSetting.user);
    if (this.globalSetting.user != null) {
      return;
    }

    this.storage.get("token_id").then(token_id => {
      // fake
      token_id = "96da3aee6b6e47b98f08664abfbc599a";



      if (token_id == null) {
        console.log('Go to page LoginPage.');
        this.tabRef.select(4);
      }
      else {
        console.log('Token id.');
        console.log(token_id);
        var url = this.globalSetting.serverAddress + "/token";
        var body = {
          "auth": {
            "type": "token",
            "token_id": token_id
          }
        }
        this.http.post(url, body)
          .subscribe(data => {
            console.log("Load data from server");
            console.log(data);
            var user = data['token'];
            this.globalSetting.user = user;
            this.storage.set("token_id", user['token_id']);
          },
            error => {
              console.error("This line is never called ", error);
            });
      }
    });
  }

}
