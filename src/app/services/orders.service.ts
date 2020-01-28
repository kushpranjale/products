import { FormGroup } from '@angular/forms';
import { ProductModel } from './../models/productModel';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url2 = 'http://localhost:3000/orders';
  productModel: ProductModel[] = [];
  updatedProduct = new Subject<ProductModel[]>();
  constructor( private http: HttpClient, private routes: Router) { }

  productListner() {
    return this.updatedProduct.asObservable();
  }

  postData( formData: FormGroup) {
    const productData = {
      product_id : UUID.UUID(),
      name: formData.value.name,
      quantity: formData.value.quantity,
      price: formData.value.price
    };
    this.productModel.push(productData);
    this.updatedProduct.next([...this.productModel]);
  }

  getData( ) {
    this.updatedProduct.next([...this.productModel]);
  }

  deleteProduct(id: string) {
      const updateProductList = this.productModel.filter( product => product.product_id !== id);
      this.productModel = updateProductList;
      this.updatedProduct.next([...this.productModel]);
  }

  getProduct(id: string) {

      const products: ProductModel = this.productModel.find( product =>
      {
        return product.product_id == id;
      }

      );
      return products;
   }

   updateProduct( id: string, formData: FormGroup ) {
    const productData: ProductModel = {
      product_id: null,
      name: formData.value.name,
      quantity: formData.value.quantity,
      price: formData.value.price
  };

    const getupdatedProducts = [...this.productModel];
    const oldPostIndex = getupdatedProducts.findIndex((p) => {if ( p.product_id == id) {
       return true;

      } else {
        return false;
      } });
    console.log(formData + ' ' + productData.name);
    const product: ProductModel = {
        product_id: id,
        name: productData.name,
        quantity: productData.quantity,
        price: productData.price
       }
    console.log(getupdatedProducts);
    getupdatedProducts[oldPostIndex] = product;
    console.log(getupdatedProducts);
    this.productModel = getupdatedProducts;
    this.updatedProduct.next([...this.productModel]);
    this.routes.navigate(['']);


  }


}
