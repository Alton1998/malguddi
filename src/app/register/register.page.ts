import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database'
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email:string=""
  password:string=""
  firstname:string=""
  lastname:string=""
  phonenumber:string=""
  companyname:string=""
  companyaddress:string=""



  constructor(public afAuth:AngularFireAuth,public db:AngularFireDatabase,private router:Router) { }

  ngOnInit() {
    let some=this.db.list('/userinfo')
    console.log(some)
  }
  async register()
  {
    const{email,password,firstname,lastname,phonenumber,companyname,companyaddress}=this
    console.log(email,password,firstname,lastname,phonenumber,companyaddress,companyname)
    await this.afAuth.auth.createUserWithEmailAndPassword(email,password).then( async (res)=>
    {
      console.log(res)
      await this.db.database.ref('/users').child(res.user.uid).set({email:email,firstName:firstname,lastName:lastname,phoneNumber:phonenumber,companyName:companyname,companyaddress:companyaddress})
      this.router.navigateByUrl('/login');
    }
    ).catch((err)=>
    {
      console.log(err)
    }
    )

  }
  login()
  {
    this.router.navigateByUrl("/login");
  }
}
