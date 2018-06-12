import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { GlobalSettingService } from '../../pages/global'

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  serverAddress: string = "http://localhost:8888";
  loginUrl: string = '/token';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

}
