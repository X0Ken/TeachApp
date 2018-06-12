
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    templateUrl: 'order-list.html'
})
export class OrderListPage {

    title: string = '';
    status: string = "all";

    constructor(public navCtrl: NavController, params: NavParams) {
        this.title = params.get("title");

    }
}
