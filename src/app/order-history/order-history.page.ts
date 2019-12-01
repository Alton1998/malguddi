import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  orderRef:AngularFireList<any>
  orders:Observable<any>
  orderItem:Array<any>
  constructor(private db:AngularFireDatabase,private auth:AngularFireAuth,private router:Router) {
   }
   getorder()
   {
     this.orderRef=this.db.list('/users/'+this.auth.auth.currentUser.uid+'/orders/')
     this.orders=this.orderRef.snapshotChanges()
     this.orders.subscribe((res)=>
     {
       this.orderItem=[]
       res.forEach((action)=>
       {
         let dict={}
         dict['products']=action.payload.val()
         dict['key']=action.payload.key
         console.log(dict)
         this.orderItem.push(dict)
       })
     })
   }
  ngOnInit() {
    console.log(this.orderItem)
  }
  ionViewDidEnter()
  {
    this.getorder()
  }
  repeatOrder(order)
  {
    console.log(order)
    this.router.navigateByUrl('/order-summary',{state:{products:order}})
  }
  
}
