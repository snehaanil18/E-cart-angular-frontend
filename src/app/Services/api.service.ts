import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  server_url = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getProductsAPI(){
    return this.http.get(`${this.server_url}/allProducts`)
  }

  getAProductAPI(id:any){
    return this.http.get(`${this.server_url}/view-product/${id}`)
  }

  registerAPI(body:any){
    return this.http.post(`${this.server_url}/register`,body)
  }

  loginAPI(body:any){
    return this.http.post(`${this.server_url}/login`,body)
  }

  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    console.log(token);
    if(token){
      headers=headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlist(product:any){
    return this.http.post(`${this.server_url}/add-to-wishlist`,product,this.appendToken())
  }

  getWishlist(){
    return this.http.get(`${this.server_url}/view-wishlist`,this.appendToken())
  }

  deleteFromWishlist(id:any){
    return this.http.delete(`${this.server_url}/delete-wishlist-product/${id}`,this.appendToken())
  }

  addToCart(product:any){
    return this.http.post(`${this.server_url}/add-to-cart`,product,this.appendToken())
  }

  getCart(){
    return this.http.get(`${this.server_url}/view-cart`,this.appendToken())
  }

  deleteFromCart(id:any){
    return this.http.delete(`${this.server_url}/delete-cart-product/${id}`,this.appendToken())
  }

  incrementCart(id:any){
    return this.http.get(`${this.server_url}/increment-cart/${id}`,this.appendToken())
  }

  decrementCart(id:any){
    return this.http.get(`${this.server_url}/decrement-cart/${id}`,this.appendToken())
  }
}
