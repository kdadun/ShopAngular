import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Products } from '../../shared/models/products';

@Component({
  selector: 'app-filtersproduct',
  templateUrl: './filtersproduct.component.html',
  styleUrls: ['./filtersproduct.component.css']
})
export class FiltersproductComponent implements OnInit {
  @Input()
  filters: any[];

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSortChange = new EventEmitter<string>();

  ngOnInit() {
  }
  onSelectChange($event) {
    this.onSortChange.emit($event.target.value);
}

}
