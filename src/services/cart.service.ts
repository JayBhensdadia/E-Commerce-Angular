// cart.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private apiUrl = 'http://localhost:8080/api/cart';

    constructor(private http: HttpClient) { }

    addToCart(productId: string, userId: string): Observable<any> {
        return this.http.post<any>(this.apiUrl, { productId, userId, quantity: 1 }, { withCredentials: true });
    }

    fetchCartItems() {
        return this.http.get('http://localhost:8080/api/cart', { withCredentials: true });

    }
}
