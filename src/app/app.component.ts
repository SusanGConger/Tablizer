import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  platform:any = Platform;
  menuController:any = MenuController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, menuCtrl:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.platform = platform;
      this.menuController = menuCtrl;
    });
  };

  exitApplication(){
    this.menuController.close();
    this.platform.exitApp();
  };

}

