import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder,private api:APIService,private router:Router){}

  registerForm = this.fb.group({ //group
    username:['',[Validators.pattern('[a-zA-Z ]*')]], //array
    email:['',[Validators.pattern('[a-zA-Z0-9@.]*')]],
    password:['',[Validators.pattern('[a-zA-Z0-9]*')]],
  })
  //control passes through the html
  register(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const user = {username,email,password}
      this.api.registerAPI(user).subscribe({
        next:(data:any) => {
          console.log(data);
          alert('Register Success')
          this.router.navigateByUrl('/user/login')
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
