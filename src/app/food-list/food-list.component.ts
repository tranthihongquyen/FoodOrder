import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Food } from '../food';
import { FoodType } from '../foodType';
import {FoodService} from '../food.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})

export class FoodListComponent implements OnInit {
 
  foodList!: Food[];
  foodType!: FoodType[];
  
  constructor(private foodService: FoodService, public router:Router) { }
  items!: Array<any>;
  pageOfItems!: Array<any>;
  
  ngOnInit(): void {
   this.getFood();
   this.getFoodType();
   this.items = Array(70).fill(0).map((x, i) => ({ id: 8, name: `Item ${i + 1}`}));
  }

  
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


  private getFood(){
    this.foodService.getFoodList().subscribe((data: Food[])=>{
      this.foodList = data;
    })
  }

  private getFoodType(){
    this.foodService.getFoodTypeList().subscribe(data=>{
      this.foodType = data;
    })
  }

  getFoodListFromFoodType(type: String){
    this.foodService.getFoodListFromFoodType(type).subscribe(data => this.foodList = data);
  }

  public directToOrder(food: Food){
    this.foodService.setFoodItemToAddToCart(food);
    this.router.navigate(['food/order']);
  }
}
