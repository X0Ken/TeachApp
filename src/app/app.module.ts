import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GlobalSettingService } from "../pages/global";
import { AskPage } from '../pages/ask/ask-write/ask';
import { AskViewPage } from '../pages/ask/ask-view/ask-view';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/user/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OfferJobPage } from '../pages/offerjob/offerjob';
import { FindJobPage } from '../pages/findjob/findjob';
import { UserPage } from '../pages/user/user';
import { OrderListPage } from '../pages/order/order-list/order-list';
import { AllOrderPage } from '../pages/order/order-overview/allorder';
import { AnswerListPage } from '../pages/answer/answer-list/answer-list';
import { AnswerShowPage } from '../pages/answer/answer-show/answer-show';
import { AnswerKeywordPage } from '../pages/answer/keyword/keyword';
import { TeacherListPage } from '../pages/offerjob/teacher-list/teacher-list';
import { TeacherDetailPage } from '../pages/offerjob/teacher-detail/teacher-detail';
import { SelfInfoPage } from '../pages/findjob/self-info/self-info';
import { LoginPage } from '../pages/user/login/login';
import { RegisterPage } from '../pages/user/register/register';
import { CreateJobOrderPage } from '../pages/order/create-job-order/create-job-order';
import { CreateQuestionOrderPage } from '../pages/order/create-question-order/create-question-order';
import { EvaluatePage } from '../pages/offerjob/evaluate/evaluate';
import { TeacherDetailInfoPage } from '../pages/offerjob/teacher-detail-info/teacher-detail-info';
import { PostListPage } from '../pages/user/postlist/postlist';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchPage } from '../pages/common/search/search';


import { IonicStorageModule } from '@ionic/storage';
import { RestProvider } from '../providers/rest/rest';
import { TalkQuestionPage } from '../pages/talk/question/talk';
import { TalkJobPage } from '../pages/talk/job/talk';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
import { UserInfoPage } from '../pages/user/info/userinfo';
import { SchoolListPage } from '../pages/common/school-list/school-list';
import { RegionListPage } from '../pages/common/region-list/region-list';
import { TalkListPage } from '../pages/talk/list/list';

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
    TeacherListPage,
    TeacherDetailPage,
    SelfInfoPage,
    LoginPage,
    RegisterPage,
    CreateJobOrderPage,
    CreateQuestionOrderPage,
    EvaluatePage,
    TeacherDetailInfoPage,
    PostListPage,
    AnswerKeywordPage,
    TalkQuestionPage,
    TalkJobPage,
    UserInfoPage,
    SchoolListPage,
    RegionListPage,
    TalkListPage
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
    TeacherListPage,
    TeacherDetailPage,
    SelfInfoPage,
    LoginPage,
    RegisterPage,
    CreateJobOrderPage,
    CreateQuestionOrderPage,
    EvaluatePage,
    TeacherDetailInfoPage,
    PostListPage,
    AnswerKeywordPage,
    TalkQuestionPage,
    TalkJobPage,
    UserInfoPage,
    SchoolListPage,
    RegionListPage,
    TalkListPage
  ],
  providers: [
    ImagePicker,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalSettingService,
    RestProvider,
    FileTransfer
  ]
})
export class AppModule { }
