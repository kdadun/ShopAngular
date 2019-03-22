import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../../shared/models/products';
import { CategoriesProductsService } from '../../shared/services/categories-products.service';
import { Router } from '@angular/router';
import { Rating } from '../../shared/models/rating';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.css']
})
export class RatingStarComponent implements OnInit {
  @Input() products: Products;
  seleectedStars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  comment: string;
  commentList: Rating[];
  stars: any[];
  constructor(private productService: CategoriesProductsService, private router: Router ) { }

  ngOnInit() {
    this.productService.getComment().subscribe(data => {
      this.commentList = data;
      this.commentList = this.commentList.filter(x => x.ProductId === this.products.Id);
      this.commentList = this.commentList.map(comment => Object.assign(comment, {stars: new Array(comment.Rate)}));
      console.log('Comment List:', this.commentList);
      console.log('Stars:', this.stars);
    });
  }


  rateProduct(x) {
    this.selectedValue = x;
  }

  addComment() {
    this.productService.addComment(this.products.Id, this.selectedValue , this.comment).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

}
