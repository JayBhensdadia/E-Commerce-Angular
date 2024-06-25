import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgClass, NgStyle, NgIf, NgFor, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf, RouterLink, NgFor, NgForOf, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  productService = inject(ProductService);
  userDetails: any = null;
  products: Product[] = [];
  error: string | null = null;
  page: number = 1;
  totalPages: number = 1;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.fetchUserDetails();
    this.loadProducts(this.page);
  }

  fetchUserDetails() {
    this.http.get('http://localhost:8080/api/user/me', { withCredentials: true })
      .pipe(
        catchError(error => {
          this.error = 'Failed to fetch user details';
          this.router.navigate(['/signin']);
          return of(null);
        })
      )
      .subscribe(response => {
        this.userDetails = response;
      });
  }

  loadProducts(page: number) {
    this.productService.getProducts(page, 10).subscribe(
      data => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error => this.error = 'Failed to load products'
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadProducts(page);
    }
  }

  viewProductDetails(id: string) {
    this.router.navigate(['/product', id]);
  }

  logout() {
    this.router.navigate(['/signin']);
  }
}
