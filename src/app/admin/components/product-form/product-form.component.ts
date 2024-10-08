import { Component } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$: Observable<any[]>;
  product: any = {};
  id: string | null;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute) {

    this.categories$ = this.categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product: any){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;
      this.productService.delete(this.id as string);
      this.router.navigate(['/admin/products']);

  }
}
