import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../Services/api.service';


@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  constructor(private route:ActivatedRoute , private api:APIService){}

  product : any = {}

  ngOnInit(): void {
    this.route.params.subscribe((result:any) => {
      console.log(result);
      const {id} = result
      console.log(id);
      this.viewProduct(id)
    })
  }

  viewProduct(id:any){
    this.api.getAProductAPI(id).subscribe({
      next:(res:any) =>{
        // console.log(res);
        this.product = res
      }
    })
  }

  addtoWishlist(product:any){
    console.log('clicked');
    
    if(sessionStorage.getItem('token')){
      this.api.addToWishlist(product).subscribe({
        next:(res:any) => {
          console.log(res);
          alert(res)     
        },
        error:(err:any) => {
          console.log(err);
          alert(err.error)          
        }
      })
    }
    else{
      alert('Login to Continue')
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem('token')){
      Object.assign(product,{quantity:1})
      
      this.api.addToCart(product).subscribe({
        next:(res:any) => {
          console.log(res);
          alert(res) 
        },
        error:(err:any) => {
          console.log(err);
          alert(err.error)          
        }
      })
    }
    else{
      alert('Login to Continue')

    }
  }


}

