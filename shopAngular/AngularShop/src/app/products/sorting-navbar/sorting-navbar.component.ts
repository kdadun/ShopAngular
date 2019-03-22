import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categories } from '../../shared/models/categories';
import { CategoriesProductsService } from '../../shared/services/categories-products.service';
@Component({
  selector: 'app-sorting-navbar',
  templateUrl: './sorting-navbar.component.html',
  styleUrls: ['./sorting-navbar.component.css']
})
export class SortingNavbarComponent implements OnInit {
  categoriesList: Categories[];
  @Input()
  customFilters: any[];
  @Input()
  priceFilters: any[];
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onFilterChange = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onPriceFilter = new EventEmitter<any>();
  showFilters = true;
  constructor(private categoriesService: CategoriesProductsService) { }

  ngOnInit() {
    this.displayCategories();
  }
  displayCategories() {
    this.categoriesService.getCategories().subscribe((data) => {
     this.categoriesList = data;

    });
  }
  onInputChange($event, filter, type) {
    const change = $event.target.checked ? 1 : -1;
    this.onFilterChange.emit({
      type,
      filter,
      isChecked: $event.target.checked,
      change
    });
}
  onPriceFilterChange($event, filter, type) {
    const change = $event.target.checked ? 1 : -1;
    this.onPriceFilter.emit({
      type,
      filter,
      isChecked: $event.target.checked,
      change
    });
  }
}
