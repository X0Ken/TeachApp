import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { School } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-school-list',
  templateUrl: 'school-list.html'
})
export class SchoolListPage {
  searchQuery: string = '';
  items: School[];
  bak: School[];
  callback;

  constructor(public navCtrl: NavController, params: NavParams,
    public rest: RestProvider, public viewCtrl: ViewController
  ) {
    this.callback = params.get("callback");
    this.items = this.bak = null;
    this.load_data()
  }

  async load_data() {
    this.bak = this.items = await this.rest.list_schools()
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = this.bak;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  goBack(item) {
    this.viewCtrl.dismiss(item);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
