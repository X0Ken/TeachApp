import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable()
export class GlobalSettingService {
  public user: User = null;

  constructor() {
    console.log('Hello GlobalSettingService Provider');
  }
}