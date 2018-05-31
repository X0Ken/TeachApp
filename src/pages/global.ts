import { Injectable } from '@angular/core';

@Injectable()
export class GlobalSettingService {
  public serverAddress:string = "http://localhost:8888";
}