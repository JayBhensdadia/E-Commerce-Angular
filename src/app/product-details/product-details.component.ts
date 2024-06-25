import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, NavbarComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  error: string | null = null;
  route = inject(ActivatedRoute);
  productService = inject(ProductService);

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data: { product: Product; }) => this.product = data.product,
        (error) => this.error = 'Failed to load product details'
      );
    }
  }
}
