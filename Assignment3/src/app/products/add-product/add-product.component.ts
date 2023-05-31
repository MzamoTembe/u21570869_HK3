import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductType } from 'src/app/shared/Type';
import { ProductBrand } from 'src/app/shared/Brand';
import { Product } from 'src/app/shared/Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  brands: ProductBrand[] = [];
  types: ProductType[] = [];

  ProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    brand: new FormControl(''),
    producttype: new FormControl(''),
  });
  product?: Product;

  constructor(private productService: ProductService, private router: Router, private toaster: ToastrService) { }
  
  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
  }

  getBrands(){
    this.productService.getBrands().subscribe({
      next: response => this.brands = [...response],
      error: error => console.log(error)
    })
  }

  getTypes(){
    this.productService.getTypes().subscribe({
      next: response => this.types = [...response],
      error: error => console.log(error)
    })
  }

  onBrandSelected(event: any)
  {
    this.ProductForm.value.brand = event.target.value;
  }

  onTypeSelected(event: any)
  {
    this.ProductForm.value.producttype = event.target.value;
  }

  addProduct(){
    console.log(this.ProductForm.value);
    var name =this.ProductForm.value.name;
    this.productService.createProduct(this.ProductForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/products/products');
        this.toaster.success( name + 'Product added succesfully');
      },
    })
  }
}
