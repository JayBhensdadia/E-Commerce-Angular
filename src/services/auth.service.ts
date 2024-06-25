// cart.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/';

    constructor(private http: HttpClient) { }


    fetchUserDetails(): Observable<any> {
        console.log('inside fetch of auth service');

        return this.http.get(`${this.apiUrl}user/me`, { withCredentials: true });
    }


}
