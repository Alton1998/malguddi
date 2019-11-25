import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import {ModalpagePage} from '../modalpage/modalpage.page'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  Prodname:any
  ProdPrice:any
  ProdCategory:any
  ProdImage:any
  ProdQuantity:any
  Prodkey:any
  constructor(private modal:ModalController,private route:ActivatedRoute ,private router :Router) {
    console.log(this.router.getCurrentNavigation().extras.state)
    const{Prodkey,Prodname,ProdPrice,ProdCategory,ProdImage,ProdQuantity}=this.router.getCurrentNavigation().extras.state
    this.Prodname=Prodname
    this.ProdPrice=ProdPrice
    this.ProdCategory=ProdCategory
    this.ProdImage=ProdImage
    this.ProdQuantity=ProdQuantity
    this.Prodkey=Prodkey
   }
  ngOnInit() {
  }
  async order()
  {
    const modalpage=await this.modal.create(
      {
        component:ModalpagePage,
        componentProps:{Prodkey:this.Prodkey,Prodname:this.Prodname,ProdPrice:this.ProdPrice,ProdCategory:this.ProdCategory,ProdImage:this.ProdImage,ProdQuantity:this.ProdQuantity},
        cssClass:"my-custom-modal-css"

      })
      return await modalpage.present();
  }
  

   
}
