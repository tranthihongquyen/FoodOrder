import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from'@angular/common/http';
import {Observable} from 'rxjs';
import {Food} from './food';
import {FoodType} from './foodType';
import { map } from 'rxjs/operators';
import { CartItem } from './cart-item';
import { Customer } from './customer';
import { Mess } from './mess';
import { Bill } from './bill';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  api_key:string = '123456';
  private baseURL1 = "https://glacial-escarpment-37713.herokuapp.com/api/foods"
  private baseURL2 = "https://glacial-escarpment-37713.herokuapp.com/api/foodtypes"
  private baseURL3 = "https://glacial-escarpment-37713.herokuapp.com/api/orders"
  private baseURL4 = "https://glacial-escarpment-37713.herokuapp.com/api/customers"
  private baseURL5 = "https://glacial-escarpment-37713.herokuapp.com/api/orders"
  
  public cart:CartItem[] = [];

  constructor(private httpClient:HttpClient) {}

  getStart():HttpHeaders{
    return new HttpHeaders().set('api_key', this.api_key);
  }

  getFoodList():Observable <Food[]>{//lấy danh sách các món ăn từ API
    return this.httpClient.get<{data:Food[]}>(`${this.baseURL1}`, {headers:this.getStart()}).pipe(map(res => res.data)); 
  }
  getFoodTypeList():Observable<FoodType[]>{ //Lấy danh sách loại món ăn từ API
    return this.httpClient.get<{data:FoodType[]}>(`${this.baseURL2}`, {headers:this.getStart()}).pipe(map(res => res.data)); 
  }

  getFoodItemByName(name:String):Observable<Food[]>{ //Tìm món ăn theo tên món
    return this.httpClient.get<{data:Food[]}>(`${this.baseURL1}?name=${name}`, {headers:this.getStart()}).pipe(map(res => res.data)); 
  }

  getCustomerList():Observable<Customer[]>{//Lấy danh sách khách hàng từ API
    return this.httpClient.get<{data:Customer[]}>(`${this.baseURL4}`, {headers:this.getStart()}).pipe(map(res => res.data));
  }

  getFoodListFromFoodType(type: String):Observable<Food[]>{
    return this.httpClient.get<{data:Food[]}>(`${this.baseURL1}?foodtype=${type}`, {headers:this.getStart()}).pipe(map(res => res.data));
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

  postOrder(totalPrice:number ):Observable<Mess>{ //lưu giỏ hàng vào Database
    class FoodPass{
      foodid!:String;
      amount!:Number;
      name!:String;
      price!:Number;
    }

    
    let orderSave:Bill;
    orderSave = new Bill();
    orderSave._id = new Date().toLocaleString();
    console.log(orderSave._id);
    for(let i:number = 0; i < this.cart.length; i++){
      let food = new FoodPass();
      food.foodid = this.cart[i].food._id;
      food.amount = this.cart[i].quantity;
      orderSave.listfood.push(food);
    }
    orderSave.customerid = (sessionStorage.getItem('username')!);
    orderSave.totalprice = totalPrice;
    orderSave.ordertime = new Date();
    return this.httpClient.post<Mess>(`${this.baseURL3}`, orderSave, {headers:this.getStart()});
  }

  getListBill(customerID:String):Observable<Bill[]>{
    return this.httpClient.get<{data: Bill[]}>(`${this.baseURL5}?customerid=${customerID}`, {headers:this.getStart()}).pipe(map(res => res.data));
  }
}

