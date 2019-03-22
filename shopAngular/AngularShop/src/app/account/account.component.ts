import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { WishList } from '../shared/models/wishList';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profile = false;
  wishlist = false;
  order = false;
  userData: any;
  userId = localStorage.getItem('id');
  userOrderList: any;
  wishesList: WishList[];
  profileForm: FormGroup;
  base64Encoded: any;
  fileToUpload: File = null;
  currentImage: any;

  constructor(private formBuilder: FormBuilder, protected authentication: AuthenticationService,
     private router: Router, private userOrder: CartService) { }

  ngOnInit() {
    this.authentication.getUserProfile().subscribe( (data: any) => {
      this.userData = data;
      this.profileForm.setValue({
       username: data.UserName,
       email: data.Email,
       telephone: data.Telephone,
       address: data.Address,
       firstName: data.FirstName,
       lastName: data.LastName,
       image: this.fileToUpload
       });
       this.currentImage = data.Image;
    });
     this.profile = true;
     this.formInitBuilder();
     this.getUserOrder();
     this.getWishList();
  }
  formInitBuilder() {
    this.profileForm = this.formBuilder.group ({
      username: [ '' ],
      email: [ '' ],
      telephone: [''],
      address: [''],
      firstName: [ '' ],
      lastName: [ ''],
      image: ['']
    });
  }

  onSubmit(profileForm: FormGroup) {
    this.authentication.updateProfile(profileForm.value, this.base64Encoded).
     subscribe(() => {
      this.router.navigate(['/home']);
      });
  }

  getUserOrder() {
    const userId = localStorage.getItem('id');
    this.userOrder.getOrderList(userId).subscribe( data => {
    this.userOrderList = data;
    });
  }
  getWishList() {

    this.userOrder.getWishList(this.userId).subscribe( data => {
      this.wishesList = data;
    });
  }
  deleteWishes(id) {
    this.userOrder.deleteWishList(id).subscribe( () => {
      this.userOrder.getWishList(this.userId).subscribe( data => {
        this.wishesList = data;
      });
    });
  }

  uploadImage(file: FileList) {
    this.fileToUpload = file.item(0);
        let reader = new FileReader();
        reader.onload = () => {
          this.base64Encoded = reader.result;
        };
        reader.readAsDataURL(this.fileToUpload);
        this.profileForm.controls['image'].setValue(file.item(0).name ? '' : '');
    }




  showProfile() {
    this.profile = !this.profile;
  }
  showWishList() {
    this.wishlist = !this.wishlist;
  }
  showOrder() {
    this.order = !this.order;
  }
}
