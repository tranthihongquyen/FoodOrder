import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from'@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodService } from './food.service';
import { OrderFormComponent } from './order-form/order-form.component';
import { FoodSearchComponent } from './food-search/food-search.component';
import { FoodHeaderComponent } from './food-header/food-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth.guard';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { BillsComponent } from './bills/bills.component'
@NgModule({
  declarations: [
    
    AppComponent,
    FoodListComponent,
    OrderFormComponent,
    FoodSearchComponent,
    FoodHeaderComponent,
    LoginComponent,
    ConfirmOrderComponent,
    BillsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwPaginationModule
  ],
  providers: [FoodService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
