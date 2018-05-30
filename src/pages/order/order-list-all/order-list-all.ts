import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-order-list-all',
  templateUrl: 'order-list-all.html'
})
export class OrderListAllPage {
  path: string = 'http://47.104.87.111:8888/jobs';

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }


}
