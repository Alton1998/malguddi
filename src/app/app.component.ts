import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth'
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'All Categories',
      url: '/categories',
      icon: 'list'
    },
    {
      title:'Order History',
      url:'/order-history',
      icon:'timer'
    }
   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afauth:AngularFireAuth, private router:Router
  ) {
    this.initializeApp();
  }
  async Signout()
  {
    await this.afauth.auth.signOut().then(()=>
{
  console.log("user signed out");
  this.router.navigateByUrl("/login")
}).catch((err)=>
{
  console.log(err);
})
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
