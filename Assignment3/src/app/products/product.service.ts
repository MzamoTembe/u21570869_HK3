import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopParams } from '../shared/shopParams';
import { Product } from '../shared/Product';
import { Pagination } from '../shared/Pagination';
import { ProductType } from '../shared/Type';
import { ProductBrand } from '../shared/Brand';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  baseUrl = 'http://localhost:5240/'

  constructor(private http: HttpClient) { }

  createProduct(product: any){
    return this.http.post(this.baseUrl + 'AddProduct', product);
  }

    getProducts(shopParams: ShopParams){
      let params = new HttpParams();
  
      if(shopParams.mytype != "") params = params.append('mytype', shopParams.mytype);
      if(shopParams.mybrand != "") params = params.append('mybrand', shopParams.mybrand);
      params = params.append('sortOrder', shopParams.sortOrder);
      params = params.append('pageNumber', shopParams.pageNumber);
      params = params.append('pageSize', shopParams.pageSize);
      if(shopParams.searchTerm) params = params.append('searchTerm', shopParams.searchTerm);

      return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params: params})
    }

    getTypes(){
      return this.http.get<ProductType[]>(this.baseUrl + 'types')
    }
  
    getBrands(){
      return this.http.get<ProductBrand[]>(this.baseUrl + 'brands')
    }
  }