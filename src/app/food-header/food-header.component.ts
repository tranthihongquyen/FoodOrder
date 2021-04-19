import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-food-header',
  templateUrl: './food-header.component.html',
  styleUrls: ['./food-header.component.css']
})
export class FoodHeaderComponent implements OnInit {

  constructor(private route:Router, private authService:AuthService) { }

  public foodName!:String;
  public account:Customer = new Customer();
  public login!:String;
  ngOnInit(): void {
    if(sessionStorage.getItem('username') == null){
      this.login = 'Log In'
    }
    else{
      console.log(sessionStorage.getItem('username'));
      this.account._id = (sessionStorage.getItem('username')!);
      this.login = 'Log Out';
    }
  }
  AfterViewInIt(){
    if(sessionStorage.getItem('username') == null){
      this.login = 'Log In'
    }
    else{
      this.account._id = (sessionStorage.getItem('username')!);
      this.login = 'Log Out';
    }
  }

  searchItem(foodName:String){
    this.route.navigate(['food/searchItem', foodName]);
  }

}
