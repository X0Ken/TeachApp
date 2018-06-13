
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    templateUrl: 'order-list.html'
})
export class OrderListPage {

    title: string = '';
    status: string = "all";
    item_title2: string = "带确认";
    order_type: string = "findTeacher";

    constructor(public navCtrl: NavController, params: NavParams) {
        this.title = params.get("title");
        this.order_type = params.get("order_type");
        if (this.order_type == "findTeacher") {
            this.item_title2 = "已发布";
        } else if (this.order_type == "question") {
            this.item_title2 = "已发布";
        }

    }
}
