import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  val:number=1;
  number:number=0;
  cartItemRef:AngularFireList<any>
  cart:Observable<any[]>;
  cartItem:Array<any>
  TotalPrice:any
  constructor(private auth:AngularFireAuth,private db:AngularFireDatabase,private router:Router,private toastcontroller:ToastController) {
   }

  ngOnInit() {
   console.log(this.cartItem)
   console.log(this.TotalPrice)
    // this.TotalPrice=0
    // this.cartItem.forEach(element => {
    //   console.log(element)
    // });


  }
  add(key)
  {
    // console.log(key)
    this.cartItem.forEach(element => {
      if(element.ProductKey==key)
      {
        element.ProdQuantity=element.ProdQuantity+1
        this.TotalPrice=this.TotalPrice+(element.ProdPrice)
      }
    });
  }
   remove(key)
   {
     this.cartItem.forEach(element => {
       if(element.ProductKey==key)
       {
         if(element.ProdQuantity<=1)
         {
           element.ProdQuantity=1
         }
         else
         {
           element.ProdQuantity=element.ProdQuantity-1
           this.TotalPrice=this.TotalPrice-(element.ProdPrice)
         }
       }
     });
  }
  async goToOrderSummary()
  {
    // let orders=this.db.database.ref('/orders')
    // let user=this.auth.auth.currentUser.uid
    // let userdb=this.db.database.ref('/users').child(user)
    // let orderid= await userdb.child('orders').push(this.cartItem).key
    // await orders.child(orderid).push(this.cartItem)
    // await userdb.child('cart').remove()
    if(this.number!=0)
    {
    this.router.navigateByUrl('/order-summary',{state:{products:this.cartItem}})
    }
    else
    {
      const toast=await this.toastcontroller.create({
        message:"Add Items to Cart",
        duration:2000
      })
      toast.present();
    }
  }
  // checkProduct(key):boolean
  // {
  //   this.cartItem.forEach((element)=>{
  //     if (element.ProductKey==key)
  //     {
  //       console.log
  //       return false
  //     }
  //   })
  //   return true
  // }
  getcart()
  {
    console.log(this.cartItem)
    let cartItemRef=this.db.list('/users/'+this.auth.auth.currentUser.uid+'/cart')
    let cart=cartItemRef.snapshotChanges()
    cart.subscribe((res)=>
    {
      this.cartItem=[]
      this.TotalPrice=0
      this.number=0
      res.forEach((action)=>
      {
        // console.log(action.payload.key)
        // console.log(action.payload.val())
        let dict={}
        dict=action.payload.val()
        dict['ProductKey']=action.payload.key
        this.cartItem.push(dict)
        this.TotalPrice=this.TotalPrice+action.payload.val()['ProdQuantity']*action.payload.val()['ProdPrice']
        this.number++
      })
    })
  }
  // calculatePrice()
  // {
  //   this.TotalPrice=0
  //   this.cartItem.forEach((element)=>
  //   {
  //     this.TotalPrice=this.TotalPrice+(element.ProdQuantity*element.ProdPrice)
  //     console.log(this.TotalPrice)
  //   })
  // }
  // calculateItem()
  // {
  //   this.number=this.cartItem.length
  // }
   deleteItemcart(key)
  {
    // console.log(key)
    // console.log(this.cartItem)
    this.cartItem.forEach(async (element) =>
     {
      if(element.ProductKey==key)
      {
        await this.db.database.ref('/users').child(this.auth.auth.currentUser.uid).child('cart').child(element.ProductKey).remove()
      }
    });
    // this.getcart()
  }
  ionViewDidEnter()
  {
    // console.log(this.cartItem)
    this.getcart()
    // console.log(this.cartItem)
  }
  
}
