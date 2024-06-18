import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{

  constructor(private api:APIService){}

  productList:any = []

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.api.getProductsAPI().subscribe({
      next:(res:any) => {
        console.log(res);
        this.productList = res
      },
      error:(err:any) => {
        console.log(err);
        
      }
    })
  }

}
