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
import { OrderListPage } from '../pages/order/order-list/order-list';
import { AllOrderPage } from '../pages/order/order-overview/allorder';
import { AnswerListPage } from '../pages/answer/answer-list/answer-list';
import { AnswerShowPage } from '../pages/answer/answer-show/answer-show';
import { TalkPage } from '../pages/talk/talk';
import { TeacherListPage } from '../pages/offerjob/teacher-list/teacher-list';
import { TeacherDetailPage } from '../pages/offerjob/teacher-detail/teacher-detail';
import { SelfInfoPage } from '../pages/findjob/self-info/self-info';
import { LoginPage } from '../pages/user/login/login';
import { RegisterPage } from '../pages/user/register/register';
import { CreateOrderPage } from '../pages/order/create-order/create-order';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchPage } from '../pages/common/search/search';


import { IonicStorageModule } from '@ionic/storage';
import { RestProvider } from '../providers/rest/rest';

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
    OrderListPage,
    AskViewPage,
    AnswerListPage,
    AnswerShowPage,
    TalkPage,
    TeacherListPage,
    TeacherDetailPage,
    SelfInfoPage,
    LoginPage,
    RegisterPage,
    CreateOrderPage
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
    OrderListPage,
    AskViewPage,
    AnswerListPage,
    AnswerShowPage,
    TalkPage,
    TeacherListPage,
    TeacherDetailPage,
    SelfInfoPage,
    LoginPage,
    RegisterPage,
    CreateOrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalSettingService,
    RestProvider
  ]
})
export class AppModule { }
