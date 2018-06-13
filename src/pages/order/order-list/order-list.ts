
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

    items: object[];

    constructor(public navCtrl: NavController, params: NavParams) {
        this.title = params.get("title");
        this.order_type = params.get("order_type");
        if (this.order_type == "findTeacher") {
            this.item_title2 = "已发布";
            this.init_post();
        } else if (this.order_type == "question") {
            this.item_title2 = "已发布";
            this.init_post();
        } else {
            this.init_get();
        }
    }

    item_filter(status: string) {
        var filterItems = this.items.filter((item) => {
            return item['status'] == status;
        });
        return filterItems;
    }

    init_get() {
        this.items = [
            {
                "title": "需要确认的订单",
                "status": "wait"
            },
            {
                "title": "进行中的订单",
                "status": "going"
            },
            {
                "title": "完成的订单",
                "status": "done"
            },
            {
                "title": "进行中的订单",
                "status": "going"
            },
            {
                "title": "完成的订单",
                "status": "done"
            },
            {
                "title": "需要确认的订单",
                "status": "wait"
            },
            {
                "title": "完成的订单",
                "status": "done"
            },
            {
                "title": "进行中的订单",
                "status": "going"
            },
            {
                "title": "完成的订单",
                "status": "done"
            },
            {
                "title": "需要确认的订单",
                "status": "wait"
            },
            {
                "title": "需要确认的订单",
                "status": "wait"
            },
            {
                "title": "需要确认的订单",
                "status": "wait"
            },
        ]
    }

    init_post() {
        this.items = [
            {
                "title": "已经发布的订单",
                "status": "wait"
            },
            {
                "title": "进行中的订单",
                "status": "going"
            },
            {
                "title": "完成的订单",
                "status": "done"
            },
            {
                "title": "进行中的订单",
                "status": "going"
            },
            {
                "title": "完成的订单",
                "status": "done"
            },
            {
                "title": "已经发布的订单",
                "status": "wait"
            },
            {
                "title": "完成的订单",
                "status": "done"
            },
            {
                "title": "进行中的订单",
                "status": "going"
            },
            {
                "title": "完成的订单",
                "status": "done"
            },
            {
                "title": "已经发布的订单",
                "status": "wait"
            },
            {
                "title": "已经发布的订单",
                "status": "wait"
            },
            {
                "title": "已经发布的订单",
                "status": "wait"
            },
        ]
    }
}
