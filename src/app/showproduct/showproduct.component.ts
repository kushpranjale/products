import { OrdersService } from './../services/orders.service';
import { OrderModel } from './../models/order';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import { ProductModel } from '../models/productModel';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit, OnDestroy , DoCheck {


  displayedColumns: string[] = ['name', 'quantity', 'price', 'delete', 'edit'];
  private dataSource: ProductModel[] = [];
  orderDetail: OrderModel[] = [];
  private productSub = new Subscription();

  constructor(private productService: ProductService, private orderService: OrdersService, private routes: Router) { }

  ngOnInit() {
    this.orderService.getData();
    this.orderService.productListner().subscribe((result) => {
      this.dataSource = result;
     // this.orderDetail.push({orders: JSON.stringify(result)});
      // this.productService.postOrder(this.orderDetail);
      // console.log(this.dataSource);
    });

  }
  ngDoCheck() {
    this.orderService.getData();
    this.orderService.productListner().subscribe((result) => {
      this.dataSource = result;
     // this.orderDetail.push({orders: JSON.stringify(result)});
      // this.productService.postOrder(this.orderDetail);

    });
  }

  onDelete(id: string) {
    console.log('product id ' + id);
    this.orderService.deleteProduct(id);
  }

  onEdit(id: string) {
    this.routes.navigate(['', id]);
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  AddProduct() {
       this.orderDetail.push({orders: JSON.stringify(this.dataSource)});
       console.log(this.orderDetail)
       this.productService.postOrder(this.orderDetail);
  }

}
