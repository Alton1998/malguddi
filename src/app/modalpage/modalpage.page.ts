import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { $ } from 'protractor';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
})
export class ModalpagePage implements OnInit {
  val:number=1;
  Prodname:any
  ProdPrice:any
  ProdCategory:any
  ProdImage:any
  ProdQuantity:any
  Prodkey:any
  constructor(private modal:ModalController,private router: Router,private auth:AngularFireAuth,private db:AngularFireDatabase) { }

  ngOnInit() {
    console.log(`${this.Prodkey}`)
    console.log(`${this.Prodname}`)
    console.log(`${this.ProdPrice}`)
    console.log(`${this.ProdCategory}`)
    console.log(`${this.ProdImage}`)
    console.log(`${this.ProdQuantity}`)
  }
  add()
  {
    this.ProdQuantity=this.ProdQuantity+1
    console.log(this.ProdQuantity)
  }
   remove()
   {
     if(this.ProdQuantity<=1)
     {
       this.ProdQuantity=1
     }
     else
     {
     this.ProdQuantity=this.ProdQuantity-1
     console.log(this.val)
     }
  }
  close()
  { 
    this.modal.dismiss(
      {'dismissed': true}
    )
  }
  gotoCart()
  {

    this.modal.dismiss(
      {'dismissed': true}
    )
    let user=this.auth.auth.currentUser.uid
    let userdb=this.db.database.ref('/users').child(user)
    userdb.child('cart').child(this.Prodkey).set({Prodname:this.Prodname,ProdPrice:this.ProdPrice,ProdCategory:this.ProdCategory,ProdImage:this.ProdImage,ProdQuantity:this.ProdQuantity})
    this.router.navigateByUrl('/cart')
  }
  async gotoOrderSummary()
  {
    // let user=this.auth.auth.currentUser.uid
    // let userdb=this.db.database.ref('/users').child(user)
    // let orderid= await userdb.child('orders').push([{Prodkey:this.Prodkey,Prodname:this.Prodname,ProdPrice:this.ProdPrice,ProdCategory:this.ProdCategory,ProdImage:this.ProdImage,ProdQuantity:this.ProdQuantity}]).key
    // let orders=this.db.database.ref('/orders')
    // await orders.child(orderid).set([{Prodkey:this.Prodkey,Prodname:this.Prodname,ProdPrice:this.ProdPrice,ProdCategory:this.ProdCategory,ProdImage:this.ProdImage,ProdQuantity:this.ProdQuantity}])
    this.modal.dismiss(
      {'dismissed': true}
    )
    this.router.navigateByUrl('/order-summary',{state:{products:[{Prodkey:this.Prodkey,Prodname:this.Prodname,ProdPrice:this.ProdPrice,ProdCategory:this.ProdCategory,ProdImage:this.ProdImage,ProdQuantity:this.ProdQuantity}]}})
  }
}
