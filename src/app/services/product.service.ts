import { OrderModel } from './../models/order';
import { FormGroup } from '@angular/forms';
import { ProductModel } from './../models/productModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   url = 'http://localhost:3000/products';
   url2 = 'http://localhost:3000/orders';
   productModel: ProductModel[] = [];
   updatedProduct = new Subject<ProductModel[]>();
  constructor( private http: HttpClient, private routes: Router) { }

  productListner() {
    return this.updatedProduct.asObservable();
  }

  getData() {
    this.http.get<{status, result: ProductModel[] }>(`${this.url}`).subscribe( result => {
    this.productModel = result.result;
    console.log(' data '  + JSON.stringify(result.result));
    this.updatedProduct.next([...this.productModel]);
    });
  }

  postData(formData: FormGroup) {
    const productData = {
      name: formData.value.name,
      quantity: formData.value.quantity,
      price: formData.value.price
    };
    this.http.post<{status, result }>(`${this.url}/create`, productData).
    subscribe(result => {
      const getproductData = {
        product_id: result.result,
        name: productData.name,
        quantity: productData.quantity,
        price: productData.price
      };
      console.log(getproductData);
      this.productModel.push(getproductData);
      this.updatedProduct.next([...this.productModel]);
    });
  }

  postOrder(formData:OrderModel[]) {
     console.log(formData)
    this.http.post<{status, result }>(`${this.url2}/createOrder`, formData).
    subscribe(result => {

      console.log(result);

    });
  }

  deleteProduct(id: string) {
    this.http.delete(`${this.url}/delete/${id}`).subscribe( result => {
      const updateProductList = this.productModel.filter( product => product.product_id !== id);
      this.productModel = updateProductList;
      this.updatedProduct.next([...this.productModel]);
    });
  }

   getProduct(id: string) {
    return this.http.get<{result: ProductModel}>(`${this.url}/${id}`);
   }

   updateProduct( id: string, formData: FormGroup ) {
    const productData: ProductModel = {
      product_id: null,
      name: formData.value.name,
      quantity: formData.value.quantity,
      price: formData.value.price
  };
    this.http.put(`${this.url}/edit/${id}`, productData)
     .subscribe(response => {
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
    });

  }

  //  updateProduct(id: string, formData: FormGroup) {
  //   const productData = {
  //     product_id: id,
  //     name: formData.value.name,
  //     quantity: formData.value.quantity,
  //     price: formData.value.price
  //   };
  //   this.http.put<{status, result }>(`${this.url}/edit/${id}`, productData).subscribe( (result) => {
  //     const productList = [...this.productModel];
  //     const getUpdateProductIndex = productList.findIndex( p => console.log(p.product_id === id) );
  //     console.log(getUpdateProductIndex + '' + id);
  //     const getproductData = {
  //       product_id: result.result,
  //       name: productData.name,
  //       quantity: productData.quantity,
  //       price: productData.price
  //     };
  //     this.productModel[getUpdateProductIndex] = getproductData;
  //     console.log(JSON.stringify(this.productModel));
  //     this.updatedProduct.next([...this.productModel]);
  //   });
  //  }
}

