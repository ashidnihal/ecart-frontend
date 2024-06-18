import { Component,OnInit } from '@angular/core';
import {ApiService} from '../services/api.service'
@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent  implements OnInit{
userproducts:any=[]
  constructor(private api:ApiService){

  }
  ngOnInit(): void {
    this.api.getAllProduct().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.userproducts=res
        
      },error:(err:any)=>{
        console.log(err);
        
      
      }
    })
  }
}
