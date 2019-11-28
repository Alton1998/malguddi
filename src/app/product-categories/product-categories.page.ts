import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})
export class ProductCategoriesPage implements OnInit {
  category:any
  productquery:any
  constructor(private router:Router,private db:AngularFireDatabase) { 
    this.productquery=[]
    const{category}=this.router.getCurrentNavigation().extras.state
    this.category=category
    this.db.database.ref("/product/allProducts").orderByChild("prodCategory").equalTo(this.category).on('child_added',(res)=>
    {
      let dict={}
      dict=res.val()
      dict['prodKey']=res.key
      this.productquery.push(dict)
    })
  }
  productDetails(Prodkey,Prodname,ProdPrice,ProdCategory,ProdImage,ProdQuantity)
    {
      console.log(Prodname,ProdPrice,ProdCategory,ProdImage,ProdQuantity)
      this.router.navigateByUrl('/product-details', { state: { Prodkey:Prodkey,Prodname:Prodname,ProdPrice:ProdPrice,ProdCategory:ProdCategory,ProdImage:ProdImage,ProdQuantity:ProdQuantity } })
    }
  ngOnInit() {
  }

}
