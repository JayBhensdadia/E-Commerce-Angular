import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
    _id: string,
    name: string;
    price: number;
    description: string;
    image: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:8080/api/product';

    constructor(private http: HttpClient) { }

    getProducts(page: number, pageSize: number): Observable<{ products: Product[], totalPages: number; }> {
        return this.http.get<{ products: Product[], totalPages: number; }>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
    }

    getProductById(id: string): Observable<{ product: Product; }> {
        return this.http.get<{ product: Product; }>(`${this.apiUrl}/${id}`);

    }
}
