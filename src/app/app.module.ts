import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GlobalSettingService } from "../pages/global";
import { AskPage } from '../pages/ask/ask-write/ask';
import { AskViewPage } from '../pages/ask/ask-view/ask-view';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OfferJobPage } from '../pages/offerjob/offerjob';
import { FindJobPage } from '../pages/findjob/findjob';
import { UserPage } from '../pages/user/user';
import { AllOrderPage } from '../pages/order/allorder/allorder';
import { OrderTabsPage } from '../pages/order/ordertabs/ordertabs';
import { OrderDonePage } from '../pages/order/order-done/order-done';
import { OrderGoingPage } from '../pages/order/order-going/order-going';
import { OrderListAllPage } from '../pages/order/order-list-all/order-list-all';
import { OrderNeedConfirmedPage } from '../pages/order/order-need-confirmed/order-need-confirmed';
import { AnswerListPage } from '../pages/answer/answer-list/answer-list';
import { AnswerShowPage } from '../pages/answer/answer-show/answer-show';
import { TalkPage } from '../pages/talk/talk';
import { TeacherListPage } from '../pages/offerjob/teacher-list/teacher-list';
import { TeacherDetailPage } from '../pages/offerjob/teacher-detail/teacher-detail';
import { SelfInfoPage } from '../pages/findjob/self-info/self-info';
import { LoginPage } from '../pages/user/login/login';
import { RegisterPage } from '../pages/user/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchPage } from '../pages/common/search/search';


import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AskPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    OfferJobPage,
    FindJobPage,
    SearchPage,
    UserPage,
    AllOrderPage,
    OrderTabsPage,
    OrderDonePage,
    OrderGoingPage,
    OrderListAllPage,
    OrderNeedConfirmedPage,
    AskViewPage,
    AnswerListPage,
    AnswerShowPage,
    TalkPage,
    TeacherListPage,
    TeacherDetailPage,
    SelfInfoPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AskPage,
    AboutPage,
    ContactPage,
    HomePage,
    OfferJobPage,
    FindJobPage,
    TabsPage,
    SearchPage,
    UserPage,
    AllOrderPage,
    OrderTabsPage,
    OrderDonePage,
    OrderGoingPage,
    OrderListAllPage,
    OrderNeedConfirmedPage,
    AskViewPage,
    AnswerListPage,
    AnswerShowPage,
    TalkPage,
    TeacherListPage,
    TeacherDetailPage,
    SelfInfoPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalSettingService
  ]
})
export class AppModule {}
