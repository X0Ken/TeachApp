import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Region } from '../../models';
import { RestProvider } from '../../../providers/rest/rest';

@Component({
  selector: 'page-region-list',
  templateUrl: 'region-list.html'
})
export class RegionListPage {
  searchQuery: string = '';
  items: Region[];
  bak: Region[];
  level: number;
  parent_id: number;
  select: Region[];

  constructor(public navCtrl: NavController, params: NavParams,
    public rest: RestProvider, public viewCtrl: ViewController
  ) {
    this.items = this.bak = null;
    this.level = 1;
    this.parent_id = -1;
    this.select = [];
    this.load_data();
  }

  async load_data() {
    this.bak = this.items = await this.rest.list_regions(this.level, this.parent_id)
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

  selectItem(item: Region) {
    this.select.push(item);
    if (item.level == 3) {
      this.viewCtrl.dismiss(this.select);
    } else {
      this.level += 1;
      this.parent_id = item.id;
      this.load_data();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
