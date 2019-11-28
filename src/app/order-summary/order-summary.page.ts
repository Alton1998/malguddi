import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, ToastController } from '@ionic/angular';
import { ChangeAddressModalPagePage } from '../change-address-modal-page/change-address-modal-page.page';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {
  products:any
  userid:any
  userAddress:any
  userName:any
  userPhone:any
  TotalPrice:any
  constructor(private router:Router,private auth:AngularFireAuth,private db:AngularFireDatabase,private modal:ModalController,private toastcontroller:ToastController) {
    const{products}=this.router.getCurrentNavigation().extras.state
    this.products=products
    this.TotalPrice=0
    this.products.forEach(element => {
      this.TotalPrice=this.TotalPrice+(element.ProdPrice*element.ProdQuantity)
    });
    console.log(this.products)
   }

  async ngOnInit() {
    this.userid= await this.auth.auth.currentUser.uid
    let userref= this.db.database.ref('/users')
    let user_cur=userref.child(this.userid)
    await user_cur.child('companyaddress').on('value',(res)=>
    {
      this.userAddress=res.val()
    })
    await user_cur.child('phoneNumber').on('value',(res)=>{
      this.userPhone=res.val()
    }
    )
    await user_cur.child('companyName').on('value',(res)=>
    {
      this.userName=res.val()
    })
  }
  async change()
  {
    const modalpage=await this.modal.create(
      {
        component:ChangeAddressModalPagePage,
        componentProps:{},
        cssClass:"my-custom-modal-css"
      }
    );
    // modalpage.onDidDismiss().then((res)=>
    // {
    //   console.log(res.data)
    //   this.userAddress=res.data.companyaddress
    //   this.userName=res.data.companyName
    //   this.userPhone=res.data.phoneNumber
    // })
    return await modalpage.present();
  }
  async confirm()
  {
    let key=this.db.database.ref('/users').child(this.userid).child('orders').push(this.products).key
    this.db.database.ref('/users').child(this.userid).child('cart').remove()
    this.db.database.ref('/orders').child(key).set({customerid:this.userid})
    const toast=await this.toastcontroller.create({
      message:"Order Placed",
      duration:2000
    })
    toast.present();
  }

}
