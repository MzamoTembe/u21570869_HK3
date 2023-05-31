import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/shared/Product';
import { ProductType } from 'src/app/shared/Type';
import { ProductBrand } from 'src/app/shared/Brand';
import { ShopParams } from 'src/app/shared/shopParams';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  types: ProductType[] = [];
  brands: ProductBrand[] = [];
  shopParams: ShopParams = new ShopParams();
  totalCount = 0;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
    {name: 'Name: Low to high', value: 'nameAsc'},
    {name: 'Name: High to Low', value: 'nameDesc'},
    {name: 'Description: Low to high', value: 'descriptionAsc'},
    {name: 'Description: High to Low', value: 'descriptionDesc'},
    {name: 'Type: Low to high', value: 'typeAsc'},
    {name: 'Type: High to Low', value: 'typeDesc'},
    {name: 'Brand: Low to high', value: 'brandAsc'},
    {name: 'Brand: High to Low', value: 'brandDesc'},
  ];
  PageOptions = [
    {name: '2 items', value: 2},
    {name: '4 items', value: 4},
    {name: '6 items', value: 6},
    {name: '8 items', value: 8},
  ];

  constructor(private productService: ProductService, private router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.productService.getProducts(this.shopParams).subscribe(
      {
      next: response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
        console.log(response);
      }
    }
    )
  }

  getBrands(){
    this.productService.getBrands().subscribe({
      next: response => {
        this.brands = [{id: 0, name: 'All'}, ...response],
        console.log(response);  
      },
      error: error => console.log(error)
    })
  }

  getTypes(){
    this.productService.getTypes().subscribe({
      next: response => {
        this.types = [{id: 0, name: 'All'}, ...response],
        console.log(response);  
      },
      error: error => console.log(error)
    })
  }

  onTypeSelected(event: any){
    this.shopParams.mytype = event.target.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onBrandSelected(event: any){
    this.shopParams.mybrand = event.target.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any)
  {
    this.shopParams.sortOrder = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any)
  {
    if(this.shopParams.pageNumber !== event)
    {
      this.shopParams.pageNumber = event;
      console.log(this.shopParams.pageNumber);  
      this.getProducts();
    }
  }

  onPageSizeSelected(event: any)
  {
    if(this.shopParams.pageSize !== event)
    {
      this.shopParams.pageSize = event.target.value;
      console.log(this.shopParams.pageSize);
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.searchTerm = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;  
    this.getProducts();
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
