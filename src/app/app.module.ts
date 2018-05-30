import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchPage } from '../pages/common/search/search';

@NgModule({
  declarations: [
    MyApp,
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
    OrderNeedConfirmedPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    OrderNeedConfirmedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
