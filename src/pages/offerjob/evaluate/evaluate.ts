import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-evaluate',
  templateUrl: 'evaluate.html'
})
export class EvaluatePage {
  items: string[];

  constructor(public navCtrl: NavController) {
    this.items = [
      "有耐心",
      "特聪明",
      "为人善良",
      "多次得奖",
      "招人喜欢",
      "敬业",
    ];
  }

}
