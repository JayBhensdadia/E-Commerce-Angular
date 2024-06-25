// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService, Product } from '../../services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, NgForOf],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartItemsWithDetails: any[] = [];
  user: any = null;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadUser();
    this.fetchCartItems();
  }

  loadUser() {
    this.authService.fetchUserDetails().subscribe((res) => {
      this.user = res;
    });
  }

  fetchCartItems() {
    this.http.get('http://localhost:8080/api/cart', { withCredentials: true })
      .subscribe(
        (data: any) => {
          this.cartItems = data.cartItems;
          this.fetchProductsForCartItems();
        },
        (error) => {
          console.error('Error fetching cart items:', error);
        }
      );
  }

  fetchProductsForCartItems() {
    for (const cartItem of this.cartItems) {
      this.productService.getProductById(cartItem.productId).subscribe(
        (data: { product: Product; }) => {
          this.cartItemsWithDetails.push({
            cartItem,
            product: data.product
          });
        },
        (error) => {
          console.error('Error fetching product details for cart item:', error);
        }
      );
    }
  }

  updateQuantity(productId: string, newQuantity: number) {

    if (newQuantity == 0) {
      this.deleteCartItem(productId);
      return;
    }


    this.http.put('http://localhost:8080/api/cart', { productId, userId: this.user._id, quantity: newQuantity }, { withCredentials: true })
      .subscribe(() => {
        this.cartItemsWithDetails.find(item => item.cartItem.productId === productId).cartItem.quantity = newQuantity;
      }, error => {
        console.error('Error updating cart item quantity:', error);
      });
  }

  deleteCartItem(productId: string) {
    this.http.delete('http://localhost:8080/api/cart', { body: { productId, userId: this.user._id }, withCredentials: true })
      .subscribe(() => {
        this.cartItemsWithDetails = this.cartItemsWithDetails.filter(item => item.cartItem.productId !== productId);
      }, error => {
        console.error('Error deleting cart item:', error);
      });
  }
}
