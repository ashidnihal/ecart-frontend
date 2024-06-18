import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  


  constructor(private api: ApiService, private route: Router , private fb:FormBuilder) {}

  registerForm=this.fb.group({ //group
    username:['',[Validators.pattern('[a-zA-Z ]*')]],//array
    email:['',[Validators.pattern('[a-zA-Z0-9@.]*')]],
    password:['',[Validators.pattern('[a-zA-Z0-9]*')]],
  })
// control passes through the html
register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      alert("register succes");
      const user={username,email,password}
      this.api.userRegister(user).subscribe({
        next: (res: any) => {
          console.log(res);
          alert("Account created");
          this.route.navigateByUrl('/user/login');
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }else{
      alert("please fill the form")
    }
  
// console.log(this.user);

  
  }
}
