import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgClass, NgStyle, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  router = inject(Router);
  userDetails: any = null;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUserDetails();
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

  logout() {
    this.router.navigate(['/signin']);
  }

}
