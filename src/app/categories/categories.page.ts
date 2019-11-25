import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categoryRef:AngularFireList<any>
  category:Observable<any>
  categoryItems:any
  constructor(private db:AngularFireDatabase) {
    this.categoryItems=[]
    this.categoryRef=db.list('category')
    this.category=this.categoryRef.valueChanges()
    this.category.subscribe((res)=>
    {
      this.categoryItems=res
    })
  }

  ngOnInit() {
  }

}
