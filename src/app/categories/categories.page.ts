import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  categoryItems:Array<any>
  constructor(private db:AngularFireDatabase,private router:Router) {
    this.itemsRef = db.list('category');
       console.log(this.itemsRef)
       this.items = this.itemsRef.snapshotChanges();
       this.items.subscribe((res)=>{
         this.categoryItems=[]
         res.forEach((action)=>
         {
           let dict={}
           dict=action.payload.val()
           this.categoryItems.push(dict)
         })
       });
  }

  ngOnInit() {
  }
  products(categoryName)
  {
    console.log(categoryName)
    // this.db.database.ref("/product/allProducts").orderByChild("prodCategory").equalTo(categoryName).on('child_added',(res)=>
    // {
    //   let dict={}
    //   dict=res.val()
    //   dict['prodKey']=res.key
    //   this.productquery.push(dict)
    // })
    this.router.navigateByUrl('/product-categories',{state:{category:categoryName}})
  }

}
