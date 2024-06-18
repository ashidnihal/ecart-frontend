import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  viewproducts:any=[]
constructor(private route:ActivatedRoute, private api:ApiService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id}=res
      console.log(id);
      this.viewProduct(id)
      
    })
  }

  viewProduct(id:any){
    this.api.viewProductAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.viewproducts=res
      },error:(res:any)=>{
        console.log(res);
        
      }
    })
  }


  addToWishlist(product: any): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.api.addToWishlist(product).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(res.message || 'Product added to wishlist successfully'); // Assuming res.message contains a success message
        },
        error: (err: any) => {
          console.log(err);
          alert(err.error.message || 'Failed to add product to wishlist'); // Assuming err.error.message contains an error message
        }
      });
    } else {
      alert('User not authenticated. Please log in.');
    }
  }

  addToCartlist(product: any): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      Object.assign(product,{quantity:1})
      this.api.addToCartlist(product).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(res); // Assuming res.message contains a success message
        },
        error: (err: any) => {
          console.log(err);
          alert(err.error.message || 'Failed to add product to cartlist'); // Assuming err.error.message contains an error message
        }
      });
    } else {
      alert('User not authenticated. Please log in.');
    }
  }

}
