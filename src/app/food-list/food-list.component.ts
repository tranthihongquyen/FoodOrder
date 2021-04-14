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

  ngOnInit(): void {
   this.getFood();
   this.getFoodType();
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

  public directToOrder(food: Food){
    this.foodService.setFoodItemToAddToCart(food);
    this.router.navigate(['food/order']);
  }


}
