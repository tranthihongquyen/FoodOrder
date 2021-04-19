import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../food';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.css', '../food-list/food-list.component.css']
})
export class FoodSearchComponent implements OnInit {

  name!:String;
  foodList!:Food[];
  constructor(private route: ActivatedRoute, private foodService: FoodService, private router:Router) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    this.getFoodItem();
  }

  convertName(){
    let temp:String ;
    temp = this.name;
    temp.trim();
    
  }
  ngDoCheck(){
  }

  public directToOrder(){
    this.router.navigate(['food/order']);
  }

  /*ngDoCheck(){
    this.name = this.route.snapshot.params['name'];
    this.getFoodItem();
  }
  ngOnChanges(){
    this.name = this.route.snapshot.params['name'];
    this.getFoodItem();
  }
  ngAfterContentInit(){
    this.name = this.route.snapshot.params['name'];
    this.getFoodItem();
  }
  ngAfterContentChecked(){
    this.name = this.route.snapshot.params['name'];
    this.getFoodItem();
  }
  ngAfterViewInit(){
    this.name = this.route.snapshot.params['name'];
    this.getFoodItem();
  }
  ngAfterViewChecked(){
    this.name = this.route.snapshot.params['name'];
    this.getFoodItem();
  }
  ngOnDestroy(){
    this.name = this.route.snapshot.params['name'];
    this.getFoodItem();
  }*/

  


  getFoodItem(){
    this.foodService.getFoodItemByName(this.name).subscribe(data => {this.foodList = data});
  }

}
