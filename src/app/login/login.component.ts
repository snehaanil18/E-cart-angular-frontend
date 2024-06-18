import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder,private api:APIService,private route:Router){}

  loginForm = this.fb.group({
    email:['',[Validators.pattern('[a-zA-Z0-9@.]*')]],
    password:['',[Validators.pattern('[a-zA-Z0-9]*')]],
  })

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      const user = {email,password}
      this.api.loginAPI(user).subscribe({
        next:(data:any) => {
          console.log(data);
          // console.log(data.token);
          sessionStorage.setItem('token',data.token)
          alert('Login Success')
          this.route.navigateByUrl('/')
        },
        error:(data:any) => {
          console.log(data);
        }
      })
    }
    else{
      alert('Invalid Details')
    }
  }
}
