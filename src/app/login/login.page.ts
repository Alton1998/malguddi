import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string=""
  password:string=""
  constructor(public afAuth: AngularFireAuth,private router:Router) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user)=>
    {
      if(user)
      {
        this.router.navigateByUrl('/home')
      }
      else{
        console.log("User not logged in")
      }
    })
  }
  async login()
  {
    const {email,password}=this
    console.log(email,password)
    await this.afAuth.auth.signInWithEmailAndPassword(email,password).then((res)=>
    {
      this.router.navigateByUrl('/home');
    }
    ).catch((err)=>
    {
      console.log(err)
    }

    )
  }
  register()
  {
    this.router.navigateByUrl('/register');
  }
}
