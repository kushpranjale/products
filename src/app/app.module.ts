import { RoutingModule } from './routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import {MatTableModule, MatPaginatorModule ,
  MatToolbarModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatMenuModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatDividerModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
   declarations: [
      AppComponent,
      AddProductComponent,
      ShowproductComponent,

   ],
   imports: [
      BrowserModule,
      RoutingModule,
      BrowserAnimationsModule,
      MatTableModule,
      MatPaginatorModule,
      MatToolbarModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatMenuModule,
      MatInputModule,
      MatCardModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRadioModule,
      MatAutocompleteModule,
      ReactiveFormsModule,
      FormsModule,
      MatBadgeModule,
      LayoutModule,
      HttpClientModule,
      MatDividerModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
