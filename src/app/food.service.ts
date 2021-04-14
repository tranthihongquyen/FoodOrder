import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http';
import {Observable} from 'rxjs';
import {Food} from './food';
import {FoodType} from './foodType';
import { map } from 'rxjs/operators';
import { CartItem } from './cart-item';
import { Customer } from './customer';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseURL1 = "https://glacial-escarpment-37713.herokuapp.com/api/foods"
  private baseURL2 = "https://glacial-escarpment-37713.herokuapp.com/api/foodtypes"
  private baseURL3 = "https://glacial-escarpment-37713.herokuapp.com/api/orders"
  private baseURL4 = "https://glacial-escarpment-37713.herokuapp.com/api/customers"
  
  public cart:CartItem[] = [];

  constructor(private httpClient:HttpClient) {}

  getFoodList():Observable <Food[]>{//lấy danh sách các món ăn từ API
    return this.httpClient.get<{data:Food[]}>(`${this.baseURL1}`).pipe(map(res => res.data)); 
  }
  getFoodTypeList():Observable<FoodType[]>{ //Lấy danh sách loại món ăn từ API
    return this.httpClient.get<{data:FoodType[]}>(`${this.baseURL2}`).pipe(map(res => res.data)); 
  }

  getFoodItemByName(name:String):Observable<Food[]>{ //Tìm món ăn theo tên món
    return this.httpClient.get<{data:Food[]}>(`${this.baseURL1}?name=${name}`).pipe(map(res => res.data)); 
  }

  getCustomerList():Observable<Customer[]>{//Lấy danh sách khách hàng từ API
    return this.httpClient.get<{data:Customer[]}>(`${this.baseURL4}`).pipe(map(res => res.data));
  }

  setFoodItemToAddToCart(food:Food){ //Thêm 1 món ăn vào giỏ hàng
    let check:Boolean = false;
    if(this.cart.length == 0){
      let item:CartItem = new CartItem();
      item.food = food;
      this.cart.push(item);
    }
    for(let i:number = 0; i < this.cart.length; i++){ //kiểm tra xem món đó đã có trong giỏ hàng hay chưa
      if(this.cart[i].food._id == food._id){
        check = true;
        break;
      }
    }
    if(!check){ //nếu chưa có mặt trong giỏ hàng thì thêm mới
      let item:CartItem = new CartItem();
      item.food = food;
      this.cart.push(item);
    }
  }
  
  getCart(){ //giỏ hàng được truyền qua các component
    return this.cart;
  }

  delete(index: number){ //xóa 1 món ăn khỏi giỏ hàng
    this.cart.splice(index, 1);
  }

  postOrder(totalPrice:number ){ //lưu giỏ hàng vào Database
    /*let date = new Date();
    let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');*/
    class Food{
      foodid!:String;
      amount!:Number;
    }
    class Order{
      _id!:String;
      time!:Date;
      customerid!:String;
      totalprice!:Number;
      listfood:Food[] = [];
    }

    let orderSave:Order;
    orderSave = new Order();
    orderSave._id = '005';
    for(let i:number = 0; i < this.cart.length; i++){
      let food = new Food();
      food.foodid = this.cart[i].food._id;
      food.amount = this.cart[i].quantity;
      orderSave.listfood.push(food);
    }
    orderSave.customerid = (sessionStorage.getItem('username')!);
    orderSave.totalprice = totalPrice;
    orderSave.time = new Date();
    console.log(orderSave);
    console.log(this.httpClient.post(`${this.baseURL3}`, orderSave));
    
  }
}

class Mess{
  status!:String;
  message!:String;
}

