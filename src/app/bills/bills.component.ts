import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from '../bill';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  constructor(private foodService:FoodService, private route: ActivatedRoute) { }
  orderBills: Bill[] = [];

  ngOnInit(): void {
    let customerid:String = this.route.snapshot.params['customerid'];
    this.foodService.getListBill(customerid).subscribe(data => {this.orderBills = data});
    this.orderBills.forEach(element => {
      //Tốt nhât là phải in ra tên món chứ ko được in mã món
    });
  }

}
