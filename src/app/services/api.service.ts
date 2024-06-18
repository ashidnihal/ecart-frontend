import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 serverURL: string='https://ecart-backend-l6kw.onrender.com'
  constructor(private http:HttpClient) {}
  
  getAllProduct(){
    return this.http.get(`${this.serverURL}/allproducts`)
  }

  userRegister(user:any){
    return this.http.post(`${this.serverURL}/register`,user)
  }

  userLogin(user:any){
    return this.http.post(`${this.serverURL}/login`,user)
  }


  viewProductAPI(id:any){
    return this.http.get(`${this.serverURL}/viewproduct/${id}`)
  }


  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    console.log(token);
    if(token){
      headers=headers.append('Authorization',`Bearer ${token}` )
    }
    return {headers}
  }
  addToWishlist(product:any){
    return this.http.post(`${this.serverURL}/addtowishlist`,product,this.appendToken())
  }

    getWishList(){
      return this.http.get(`${this.serverURL}/getwishlist`,this.appendToken())
    }

    addToCartlist(product:any){
      return this.http.post(`${this.serverURL}/addtocartlist`,product,this.appendToken())
    }
  
      getCartlist(){
        return this.http.get(`${this.serverURL}/getcartlist`,this.appendToken())
      }

      deleteWishList(id:any){
        return this.http.delete(`${this.serverURL}/deletewishlist/${id}`,this.appendToken())
      }
      deleteCartList(id:any){
        return this.http.delete(`${this.serverURL}/deletecartlist/${id}`,this.appendToken())
      }
      incrementCart(id:any){
        return this.http.get(`${this.serverURL}/incrementcart/${id}`,this.appendToken())
      }
      decrementCart(id:any){
        return this.http.get(`${this.serverURL}/decrementcart/${id}`,this.appendToken())
      }
}
