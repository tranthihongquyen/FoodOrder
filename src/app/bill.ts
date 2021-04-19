export class Bill {
        _id!:String;
        customerid!:String;
        ordertime!:Date;
        totalprice!:Number;
        listfood:FoodPass[] = [];
        address_rev!:String;
        confirm!:Boolean;
}

class FoodPass{
    foodid!:String;
    amount!:Number;
    name!:String;
    price!:Number;
  }