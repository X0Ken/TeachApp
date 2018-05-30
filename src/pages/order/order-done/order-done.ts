import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-order-done',
  templateUrl: 'order-done.html'
})
export class OrderDonePage {
  path: string = 'http://47.104.87.111:8888/jobs';

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }



}
