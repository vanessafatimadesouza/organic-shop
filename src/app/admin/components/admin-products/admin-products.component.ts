import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, OnInit {
  products: Product[] = [];
  subscription: Subscription | undefined;
  itemCount: number = 0;  
  query: any;
  editingProduct: Product | null = null; // Para armazenar o produto em edição

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products;
      this.itemCount = products.length;
    });
  }

  get filteredProducts() {
    return this.query ? 
      this.products.filter(p => p.title.toLowerCase().includes(this.query.toLowerCase())) : 
      this.products;
  }

  filter(query: string) {
    this.query = query;  
    this.itemCount = this.filteredProducts.length; 
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product }; // Clona o produto para edição
  }

  updateProduct() {
    if (this.editingProduct) {
      this.productService.update(this.editingProduct.key, this.editingProduct)
        .then(() => {
          console.log('Product updated successfully');
          this.editingProduct = null; // Limpa o produto em edição
        })
        .catch(error => console.error('Error updating product:', error));
    }
  }

  cancelEdit() {
    this.editingProduct = null; // Limpa o produto em edição
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
