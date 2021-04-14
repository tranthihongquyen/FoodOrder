import { hostViewClassName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Customer } from '../customer';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  previousUrl!: string;
  constructor(private foodService: FoodService, 
              private formBuilder: FormBuilder, 
              private router: Router, 
              private authService: AuthService,) {

                //chỗ này bày đặt trả về previous url mà có được đâu
                this.previousUrl = this.router.url;
                router.events.subscribe(event => {
                  if (event instanceof NavigationEnd) {        
                    console.log(event.url);
                    this.previousUrl = event.url;
                  };
                });

  }

  loginForm!: FormGroup;
  message!: String;
  returnURL!: String;
  customerList!: Customer[];
  account:AccountData = new AccountData();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      _id:['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnURL = 'food/order';
  }
  get f(){return this.loginForm.controls;}

  public login(){
    if(this.loginForm.invalid){
      return;
    }
    else{
      this.authService.getLoginAccount(this.f._id.value, this.f.password.value).subscribe(data => {this.account = data
        if(this.account.status == 0){
          console.log("Login Successful");
          sessionStorage.setItem ('isLoggedIn', "true");
          sessionStorage.setItem('username', this.account.data._id.toString()); //lưu vào session
          this.authService.setAccount(this.account.data); //lưu lại account truyền qua các component
        }
        else{
          this.message = "Please check your id and password";
        }
      });
    }
    this.router.navigate(['food/confirm-order']);
  }
}

class AccountData{
  message!: String;
  status!: Number;
  data!:Customer;
}
