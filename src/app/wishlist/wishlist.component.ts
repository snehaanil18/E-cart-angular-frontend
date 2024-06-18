import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  product: any = []

  ngOnInit(): void {
    this.viewWishlist()
  }

  viewWishlist() {
    this.api.getWishlist().subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data
      }
    })
  }

  constructor(private api: APIService) {}

  deleteProduct(id: any) {
    this.api.deleteFromWishlist(id).subscribe({
      next: (data: any) => {
        console.log(data);
        alert('Product removed from Wishlist')
        this.viewWishlist()
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  
  addToCart(product:any){
    console.log('click');
    if(sessionStorage.getItem('token')){
      Object.assign(product,{quantity:1})
      this.api.addToCart(product).subscribe({
        next:(res:any) => {
          console.log(res);
          alert(res)
          this.deleteProduct(product.id)
        },
        error:(err:any) => {
          console.log(err);
          alert(err.error)          
        }
      })
    }
  }
}
