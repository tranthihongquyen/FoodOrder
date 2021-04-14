import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodSearchComponent } from './food-search/food-search.component';
import { LoginComponent } from './login/login.component';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  {path: 'food/home', component:FoodListComponent},
  {path: 'food/food-detail', component:FoodDetailComponent},
  {path: 'food/order', component:OrderFormComponent},
  {path: 'food/searchItem/:name', component:FoodSearchComponent},
  {path: 'food/confirm-order', component: ConfirmOrderComponent, canActivate:[AuthGuard]},
  {path: 'foodie/login', component: LoginComponent},
 
  {path: '', redirectTo: 'food/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
