import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../cart-item';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  cart:CartItem[] =[];
  quantity: Number[] = [1,2,3,4,5];
  totalPrice: number = 0;
  constructor(private foodService:FoodService, private router:Router) { }

  ngOnInit(): void {
    this.cart = this.foodService.getCart();
    if(this.cart.length > 0){
      this.cart[this.cart.length - 1].quantity = 1;
      this.cart[this.cart.length - 1].price2 = this.cart[this.cart.length - 1].food.price * this.cart[this.cart.length - 1].quantity
    }
    this.caculatePrice();
  }
  
  caculatePrice(){
    this.totalPrice = 0;
    for(let i:number = 0; i < this.cart.length; i++){
      this.totalPrice += this.cart[i].price2;
    }
  }
  
  selectChangeHandler (event: any, _id:String) {//event handler for the select element's change event
    //update the ui
    for(let i:number = 0; i < this.cart.length; i++){
      if(this.cart[i].food._id === _id){
        this.cart[i].quantity = event.target.value;
        this.cart[i].price2 = this.cart[i].food.price * this.cart[i].quantity;
      }
    }
    this.caculatePrice();
  }

  delete ( _id:String) {
    for(let i:number = 0; i < this.cart.length; i++){
      if(this.cart[i].food._id === _id){
        this.foodService.delete(i);
      }
    }
    this.caculatePrice();
  }

  addOrder(){
    let date: Date = new Date();
    console.log(date);
    console.log(this.cart);
    this.router.navigate(['food/confirm-order']);
  }
  
}
