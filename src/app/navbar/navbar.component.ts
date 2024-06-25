import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgIf } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItems: any[] | null = null;

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.fetchUserDetails();
    this.cartService.fetchCartItems().subscribe((res: any) => {
      this.cartItems = res.cartItems;
    });
  }

  fetchUserDetails() {
    this.http.get('http://localhost:8080/api/user/me', { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error fetching user details:', error);
          return of(null);
        })
      )
      .subscribe((response: any) => {
        this.isLoggedIn = response !== null;
      });
  }

  logout() {
    this.http.get('http://localhost:8080/api/logout', { withCredentials: true })
      .subscribe(() => {
        window.location.reload();
      });
  }
}
