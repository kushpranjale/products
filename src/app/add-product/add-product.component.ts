import { OrdersService } from './../services/orders.service';
import { ProductService } from './../services/product.service';
import { ProductModel } from './../models/productModel';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

   productFormGroup: FormGroup;
   mode = 'create';
   id: string;
   productModel: ProductModel;
   button = 'Add Item'

  constructor( private productService: ProductService, private orderService: OrdersService, private actvateRoute: ActivatedRoute) { }

  ngOnInit() {
  this.productFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
  });
  this.actvateRoute.paramMap.subscribe((paramMap: ParamMap) => {
       console.log(paramMap);
       if (paramMap.has('id') ) {
         this.mode = 'edit';
         this.button = 'Update'
         this.id = paramMap.get('id');
         const Getdata: ProductModel = this.orderService.getProduct(this.id);
         this.productFormGroup.setValue ({
          name: Getdata.name,
          quantity: Getdata.quantity,
          price: Getdata.price
      });

         console.log(this.productModel);
         console.log(this.id);
        }

     });
  }

  onSubmit(productForm: FormGroupDirective) {
    if (this.productFormGroup.valid) {
      if ( this.mode === 'create') {
     this.orderService.postData(this.productFormGroup);
     console.log('valid');
      } else {
     this.orderService.updateProduct(this.id, this.productFormGroup);
      }
      this.productFormGroup.reset();
      productForm.resetForm();

    } else {
    return;
    }
 }
}
