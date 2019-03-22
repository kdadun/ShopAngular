import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesProductsService } from '../shared/services/categories-products.service';
import { Products } from '../shared/models/products';
import { SortingNavbarComponent } from './sorting-navbar/sorting-navbar.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filteredProduct: Products[] ;
  listFilterByPrice: Products[] = [];
  customListFilter: Products[] = [];
  products: Products[];
  resetProduct: Products[];
  currentSorting: string;
  wrapper = true;
  @ViewChild('filtersComponent')
  filtersComponent: SortingNavbarComponent;

  constructor(protected productsService: CategoriesProductsService) { }
  sortFilters: any[] = [
    { name: 'Name (A to Z)', value: 'name' },
    { name: 'Price (low to high)', value: 'priceAsc' },
    { name: 'Price (high to low)', value: 'priceDes' }
  ];
  priceFilters: any[] = [
    { name: 'All', value: 'all', checked: true },
    { name: 'Price > 2000', value: 'more_2000', checked: false },
    { name: 'Price < 500', value: 'less_500', checked: false }
  ];

  ngOnInit() {
    this.displayProducts();

  }
  displayProducts() {
    this.productsService.getProducts().subscribe(product => {
      this.customListFilter = product;
      this.products = product;
      this.resetProduct = product;
      this.listFilterByPrice = product;
      this.filteredProduct = product; });
    }
        onPriceFilter(data) {
          this.listFilterByPrice = this.resetProduct;
          if (  data.type === 'price') {
            if (data.isChecked) {
              const priceFilter = data.filter.value;
              if (priceFilter === 'all') {
                  this.listFilterByPrice = this.listFilterByPrice;
              } else if (priceFilter === 'more_2000' ) {
                  // this.listFilterByPrice = this.resetProduct;
                this.listFilterByPrice =  this.listFilterByPrice.filter(x => x.Price >= 2000);

              } else if (priceFilter === 'less_500' ) {
                    // this.listFilterByPrice = this.resetProduct;
                this.listFilterByPrice =  this.listFilterByPrice = this.listFilterByPrice.filter(x => x.Price <= 500);
              }
        }
      }
          this.showDiferences();
    }
    showDiferences() {
      this.products = [];
      const id = this.filteredProduct.map(item => item.Id);
      this.products = this.listFilterByPrice.filter( item => id.indexOf(item.Id) !== -1);
    }
    onFilterChange(data) {
    if (data.type === 'category') {
    if (data.isChecked) {
        // this.filteredProduct.slice(0);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.filter.Products.length; i++) {
        this.filteredProduct.push(data.filter.Products[i]);
        }
      } else {
        this.filteredProduct =
        this.filteredProduct.filter(x => {
          return x.CategoryId !== data.filter.Id; } );
      }
    }
    this.showDiferences();
    }
    sortProducts(criteria) {
      this.products.sort((a, b) => {
        const priceComparison = a.Price - b.Price;
        if (criteria === 'priceDes') {
            return -priceComparison;
        } else if (criteria === 'priceAsc') {
          return priceComparison;
        } else if (criteria === 'name') {
          const nameA = a.Name.toLowerCase();
          const nameB = b.Name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          // tslint:disable-next-line:curly
          if (nameA > nameB)
            return 1;
          return 0;

        } else {
          return -1;
        }
      });
    }
    showHide() {
      this.wrapper = this.wrapper ? false : true;
    }
  }

