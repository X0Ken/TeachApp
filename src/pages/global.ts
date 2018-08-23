import { Injectable } from '@angular/core';

@Injectable()
export class GlobalSettingService {
  public user: object = null;

  constructor() {
    console.log('Hello RestProvider Provider');
  }
}