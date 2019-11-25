import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-address-modal-page',
  templateUrl: './change-address-modal-page.page.html',
  styleUrls: ['./change-address-modal-page.page.scss'],
})
export class ChangeAddressModalPagePage implements OnInit {
  name:any
  address:any
  Phone:any
  constructor(private db:AngularFireDatabase,private auth:AngularFireAuth,private modal:ModalController) { 

  }

  ngOnInit() {
    
  }
  async addAddress()
  {
    const{name,address,Phone,}=this
    console.log(name,address,Phone)
    let user=this.db.database.ref('/users').child(this.auth.auth.currentUser.uid)
    await user.update({companyaddress:address,companyName:name,phoneNumber:Phone})
    this.modal.dismiss(
      {'dismissed': true,companyaddress:address,companyName:name,phoneNumber:Phone}
    )
  }
}
