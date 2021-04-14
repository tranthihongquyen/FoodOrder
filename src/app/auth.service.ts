import {HttpClient} from'@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Customer} from './customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL5 = "https://glacial-escarpment-37713.herokuapp.com/api/login";
  account: Customer = new Customer();

  constructor(private httpClient:HttpClient) {}
  

  getLoginAccount(userName:String, password: String): Observable<AccountData>{
    return this.httpClient.get<AccountData>(`${this.baseURL5}?username=${userName}&password=${password}`).pipe(map(data=>{return data}));
  }

  logout(){
    sessionStorage.setItem('isLoggedIn', "false");
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    this.account._id = "";
    }
  public setAccount(account: Customer){ //gán mã khách hàng(login) 
    this.account._id = account._id;
  }
  public getAccount(){ //truyền thông tin khách hàng giữa các component
    return this.account;
  }
}

class AccountData{
  message!: String;
  status!: Number;
  data!:Customer;
}
