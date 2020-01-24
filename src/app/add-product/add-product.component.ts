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

  constructor( private productService: ProductService, private actvateRoute: ActivatedRoute) { }

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
         this.id = paramMap.get('id');
         this.productService.getProduct(this.id).subscribe ( result => {
             console.log(result.result[0]);
             this.productModel = result.result[0];
             this.productFormGroup.setValue ({
              name: this.productModel.name,
              quantity: this.productModel.quantity,
              price: this.productModel.price
          });

           });
         console.log(this.productModel);
         console.log(this.id);

        }

     });
  }

  onSubmit(productForm: FormGroupDirective) {
    if (this.productFormGroup.valid) {
      if ( this.mode === 'create') {
     this.productService.postData(this.productFormGroup);
     console.log('valid');
      } else {
     this.productService.updateProduct(this.id, this.productFormGroup);
      }
      this.productFormGroup.reset();
      productForm.resetForm();

    } else {
    return;
    }
 }
}
