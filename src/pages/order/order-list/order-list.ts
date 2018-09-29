
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { Order } from '../../models';
import { CreateQuestionOrderPage } from '../create-question-order/create-question-order';
import { CreateJobOrderPage } from '../create-job-order/create-job-order';


@Component({
    templateUrl: 'order-list.html'
})
export class OrderListPage {

    title: string = '';
    status: string = "all";
    item_title2: string = "待确认";
    order_type: string = "findTeacher";

    items: Order[];

    constructor(public navCtrl: NavController, params: NavParams,
        public rest: RestProvider) {
        this.order_type = params.get("order_type");

        if (this.order_type == "offer_job") {
            this.title = "找家教订单";
            this.item_title2 = "已发布";
        } else if (this.order_type == "job") {
            this.title = "当家教订单";
            this.item_title2 = "待确认";
        } else if (this.order_type == "question") {
            this.title = "提问订单";
            this.item_title2 = "已发布";
        } else if (this.order_type == "answer") {
            this.title = "回答订单";
            this.item_title2 = "待确认";
        }
        this.items = [];
        this.load_data();
    }

    item_filter(status: string) {
        var filterItems = this.items.filter((item) => {
            return item['state'] == status;
        });
        return filterItems;
    }

    async load_data() {
        this.items = await this.rest.list_orders(this.order_type);
        for (let item of this.items) {
            if (item.type == 'question') {
                item.question = await this.rest.get_question(item.type_id);
                item.title = item.question.content;
            } else if (item.type == 'job') {
                item.job = await this.rest.get_teacher_job(item.type_id);
                item.title = item.job.subject + "-" + item.job.method;
            } else {
                console.log("Error type");
            }
        }
    }

    go_detail(order: Order) {
        console.log("push order", order);
        if (order.type == "question") {
            this.navCtrl.push(CreateQuestionOrderPage, {
                'order': order,
            });
        } else if (order.type == "job") {
            this.navCtrl.push(CreateJobOrderPage, {
                'order': order,
            });
        }
    }

}
