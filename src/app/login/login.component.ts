import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
// user:any={}
  constructor(private api:ApiService, private route:Router, private fb:FormBuilder){}

  loginForm=this.fb.group({
    email:['',[Validators.pattern('[a-zA-Z0-9@.]*')]],
    password:['',[Validators.pattern('[a-zA-Z0-9]*')]],
  })
  
  login(){
    if(this.loginForm.valid){
      const email=this.loginForm.value.email
      const password=this.loginForm.value.password
      alert('login success')
      const user = {email,password}
      this.api.userLogin(user).subscribe({
            next:(res:any)=>{
              console.log(res);
              // alert("Logged in successfully!")
              sessionStorage.setItem("username",res.existingUser.username)
              sessionStorage.setItem("token",res.token)
              this.route.navigateByUrl('')
            },error:(err:any)=>{
              console.log(err);
              
            }
          })
    }else{
      alert('please fill the form')
    }
  }


  // loginUser(){
  //   if(!this.user.email||!this.user.password){
  //     alert("please fill the form" )
  //     return
  //   }
  //   this.api.userLogin(this.user).subscribe({
  //     next:(res:any)=>{
  //       console.log(res);
  //       alert("Logged in successfully!")
  //       this.route.navigateByUrl('')
  //     },error:(err:any)=>{
  //       console.log(err);
        
  //     }
  //   })
  // }
}
