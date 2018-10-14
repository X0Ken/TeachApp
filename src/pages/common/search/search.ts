import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  searchQuery: string = '';
  items: string[];
  callback;

  constructor(public navCtrl: NavController, params: NavParams) {
    this.callback = params.get("callback");
    this.items = params.get("items");
    this.initializeItems();

  }

  initializeItems() {
    if (this.items == null){
      this.items = [
        'Amsterdam',
        'Bogota'
      ];
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
  goBack(item){
    this.callback(item).then(()=>{
      this.navCtrl.pop();
  });
  }

}
