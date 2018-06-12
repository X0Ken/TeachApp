import { Injectable } from '@angular/core';

@Injectable()
export class GlobalSettingService {
  //public serverAddress: string = "http://47.104.87.111:8888";
  //public serverAddress: string = "http://localhost:8888";
  public serverAddress: string = "http://192.168.0.121:8888";
  public user: object = null;
  public teacher: object = null;

  constructor() {
    console.log('Hello RestProvider Provider');
  }
}