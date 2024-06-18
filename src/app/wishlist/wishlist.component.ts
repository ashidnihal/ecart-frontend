import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

    products:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
   
    this.getWishlistItems()
 
    }

    getWishlistItems(){
      this.api.getWishList().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.products=res
          
        },error:(err:any)=>{
          console.log(err);
        }
      })
    }

    deleteProduct(id:any){
      this.api.deleteWishList(id).subscribe({
        next:(res:any)=>{
          alert("Product deleted successfully")
          this.getWishlistItems()
        },error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
    
    addToCartlist(product: any): void {
      const token = sessionStorage.getItem('token');
      if (token) {
      Object.assign(product,{quantity:1})

        this.api.addToCartlist(product).subscribe({
          next: (res: any) => {
            console.log(res);
            alert(res.message || 'Product added to cartlist successfully'); // Assuming res.message contains a success message
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




