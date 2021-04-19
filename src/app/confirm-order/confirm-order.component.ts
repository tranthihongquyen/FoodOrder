import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartItem } from '../cart-item';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router, private foodService:FoodService) { }

  cart!:CartItem[]; //Cart của khách hàng
  totalPrice:number = 0;

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') == 'false'){ //kiểm tra đã login hay chưa, nếu login rồi (hàm isLoggedIn == true; giá trị username lưu ở token) thì thôi, chưa thì qua login
      this.route.navigate(['foodie/login']);
    }
    else{
      this.cart = this.foodService.getCart();
      
      this.cart.forEach(element => {
        this.totalPrice += element.price2;
      });
      //this.foodService.postCartToDB(this.cart);
    }
  }

  logout(){
    this.authService.logout();
    this.route.navigate(['food/home']);
  }

  confirm (){
    this.foodService.postOrder(this.totalPrice).subscribe(data => {
      if(data.status == 0){
        console.log("Bạn đã đặt hàng thành công");
      }
      else if(data.status == 11000){
        console.log("Mã đơn hàng đã tồn tại, vui lòng thử lại");
      }
      else{
        console.log("Không thể đặt hàng, vui lòng thử lại");
      }
    });
  }

}
