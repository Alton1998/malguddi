import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Router ,NavigationExtras} from '@angular/router';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  key:Array<any>
  something
  productItemsRef:AngularFireList<any>;
  proitems:Observable<any[]>
  productItems:Array<any>
  categoryItems:Array<any>
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView:4,
  };
  constructor(private db:AngularFireDatabase, private router: Router) {
    this.productItems=[]
       this.itemsRef = db.list('category');
       console.log(this.itemsRef)
       this.items = this.itemsRef.valueChanges();
       this.items.subscribe((res)=>{
         console.log(res)
         this.categoryItems=res
         console.log(this.categoryItems)
       });
       this.productItemsRef=db.list('/product/allProducts/');
       this.proitems=this.productItemsRef.snapshotChanges()
       this.proitems.subscribe((res)=>{
         res.forEach((action)=>
         {
          //  console.log(action.payload.val())
          //  console.log(action.payload.key)
           let dict={}
           dict=action.payload.val()
           dict['ProductKey']=action.payload.key
           console.log(dict)
           this.productItems.push(dict)
         })
       })
  }


  ngOnInit(){
    console.log(this.items)
    console.log(this.categoryItems)
    }
    productDetails(Prodkey,Prodname,ProdPrice,ProdCategory,ProdImage,ProdQuantity)
    {
      console.log(Prodname,ProdPrice,ProdCategory,ProdImage,ProdQuantity)
      this.router.navigateByUrl('/product-details', { state: { Prodkey:Prodkey,Prodname:Prodname,ProdPrice:ProdPrice,ProdCategory:ProdCategory,ProdImage:ProdImage,ProdQuantity:ProdQuantity } })
    }
    goToCart()
    {
      this.router.navigate(['cart'])
    }
  
}
