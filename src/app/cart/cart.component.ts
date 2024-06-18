import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any=[]
  paymentStatus:boolean=false
  totalPrice: number = 0;
  public payPalConfig?: IPayPalConfig;
  showSuccess:boolean=false

  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.initConfig();
    this. getCartList()
    
      
    }

    getCartList(){
      this.api.getCartlist().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.products=res
          this.calculateTotal()
        },error:(err:any)=>{
          console.log(err);
        }
      })
    }

    calculateTotal(): void {
      let total = 0;
      this.products.forEach((item: any) => {
        total += item.price * item.quantity; // Assuming item has price and quantity
      });
      this.totalPrice = Math.round(total * 100) / 100; // Rounds to two decimal places
    }
    // calculateTotal(){
    //   let total=0;
    //   // this.totalPrice=Math.round( this.products.reduce((acc: number, product: { price: number; quantity: number; }) => acc + product.price * product.quantity, 0));
    //   this.totalPrice=this.products.forEach((item:any) => {
    //   total=total+item.grandTotal
    //   this.totalPrice=total
    //   });
    //   }
    
  deleteProduct(id:any){
    this.api.deleteCartList(id).subscribe({
      next:(res:any)=>{
        alert("product deleted")
        this.getCartList()
      },error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  incrementQuantity(id:any){
    this.api.incrementCart(id).subscribe({
      next:(res:any)=>{
       
        this.getCartList()

      },error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  decrementQuantity(id:any){
    this.api.decrementCart(id).subscribe({
      next:(res:any)=>{
        this.getCartList()
      },error:(err:any)=>{
        console.log(err);
        
      },
    })
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
    
  payment(){
    this.paymentStatus=true
  }
}
