import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { catchError, of } from 'rxjs';

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
  user: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data: { product: Product; }) => this.product = data.product,
        (error) => this.error = 'Failed to load product details'
      );
    }
  }

  addToCart() {
    this.authService.fetchUserDetails().pipe(
      catchError((error: any) => {
        this.error = 'Failed to fetch user details';
        this.router.navigate(['/signin']);
        console.error('Error fetching user details:', error);
        return of(null); // Return observable with null to continue the stream
      })
    ).subscribe((response: any) => {
      if (response) {
        this.user = response;

        if (this.product) {
          this.cartService.addToCart(this.product._id, this.user._id).subscribe(
            () => {
              console.log('Item added to cart successfully!');
            },
            (error) => {
              console.error('Error adding item to cart:', error);
            }
          );
        }
      }
    });
  }
}
