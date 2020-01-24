import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from '../models/productModel';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['name', 'quantity', 'price', 'delete', 'edit'];
  dataSource: ProductModel[] = [];
  private productSub = new Subscription();

  constructor(private productService: ProductService, private routes: Router) { }

  ngOnInit() {
    this.productService.getData();
    this.productService.productListner().subscribe((result) => {
      this.dataSource = result;
    });
    console.log(this.dataSource);
  }
  onDelete(id: string) {
    console.log('product id ' + id);
    this.productService.deleteProduct(id);
  }

  onEdit(id: string) {
    this.routes.navigate(['', id]);
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}
