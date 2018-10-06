import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { UserInfo, User } from '../../models';
import { TabsPage } from '../../tabs/tabs';
import { ImagePicker } from '@ionic-native/image-picker';



@Component({
  selector: 'page-user-info',
  templateUrl: 'userinfo.html'
})
export class UserInfoPage {

  user: User
  userinfo: UserInfo

  constructor(public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private rest: RestProvider, ) {
    this.userinfo = null;
    this.user = null;
    this.load_data();
  }

  async load_data() {
    this.user = await this.rest.get_user_myself()
    this.userinfo = await this.rest.get_user_info();
  }

  select_image() {
    let options = {
      maximumImagesCount: 1,//选择一张图片
      width: 800,
      height: 800,
      quality: 80
    };
    this.imagePicker.getPictures(options).then((results) => {
      console.log("select_image", JSON.stringify(results));
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.rest.uploadImg(results[i]).then(att => {
          this.user.pic = att;
          this.rest.update_user(this.user);
        }, err => {
          console.log('uploadImg error: ' + err);
        });
      }
    }, (err) => {
      console.log('Error: ' + err);
    });
  }


  async submit() {
    this.userinfo = await this.rest.update_user_info(this.userinfo);
    this.navCtrl.push(TabsPage);
  }

}
