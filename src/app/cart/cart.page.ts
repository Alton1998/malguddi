import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { element } from 'protractor';

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
  constructor(private auth:AngularFireAuth,private db:AngularFireDatabase,private router:Router) {
    this.cartItem=[]
    this.TotalPrice=0
    this.cartItemRef=db.list('/users/'+auth.auth.currentUser.uid+'/cart')
    this.cart=this.cartItemRef.snapshotChanges()
    this.cart.subscribe((res)=>
    {
      res.forEach((action)=>
      {
        // console.log(action.payload.key)
        // console.log(action.payload.val())
        let dict={}
        dict=action.payload.val()
        dict['ProductKey']=action.payload.key
        this.cartItem.push(dict)
        this.number=this.number+1
        this.TotalPrice=this.TotalPrice+(dict['ProdPrice']*dict['ProdQuantity'])
      })
    })

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
  goToOrderSummary()
  {
    // let orders=this.db.database.ref('/orders')
    // let user=this.auth.auth.currentUser.uid
    // let userdb=this.db.database.ref('/users').child(user)
    // let orderid= await userdb.child('orders').push(this.cartItem).key
    // await orders.child(orderid).push(this.cartItem)
    // await userdb.child('cart').remove()
    
    this.router.navigateByUrl('/order-summary',{state:{products:this.cartItem}})
  }
}
