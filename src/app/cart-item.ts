import { Food } from "./food";

export class CartItem {
    food!:Food;
    price2!:number; //giá của sản phẩm tương ứng với số lượng
    quantity!:number;
}
