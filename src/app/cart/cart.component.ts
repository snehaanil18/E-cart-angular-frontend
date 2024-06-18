import { Component, OnInit } from '@angular/core';
import { APIService } from '../Services/api.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  product: any = []

  totalPrice:Number = 0;

  showSuccess:boolean = false
  paymentStatus:boolean = false

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.viewCart()
    this.grandTotalCalculate()
    this.initConfig();
  }

  viewCart() {
    this.api.getCart().subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data
        this.grandTotalCalculate()
      }
    })
  }

  deleteProduct(id:any){
    this.api.deleteFromCart(id).subscribe({
      next: (data: any) => {
        console.log(data);
        // alert('Product removed from Cart')
        this.viewCart()
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  incrementProduct(id:any){
    this.api.incrementCart(id).subscribe({
      next:(data:any) => {
        console.log(data);
        this.viewCart()
        this.grandTotalCalculate()
      },
      error: (err:any) => {
        console.log(err);
        alert(err)
      }
    })
  }

  decrementProduct(id:any){
    this.api.decrementCart(id).subscribe({
      next:(data:any) => {
        console.log(data);
        this.viewCart()
        this.grandTotalCalculate()
      },
      error: (err:any) => {
        console.log(err);
        alert(err)
      }
    })
  }

  grandTotalCalculate(){
    console.log('grand Total');
    console.log(this.product);
    
    let total = 0
    this.product.forEach((item:any) => {
      total = total + item.grandTotal
      console.log(`Item grandTotal: ${item.grandTotal}`);
     
    })
    this.totalPrice = total
  }

  payment(){
    this.paymentStatus = true
  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
