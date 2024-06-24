import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateDateOfBirth, validateEmail, validateName, validatePassword, validatePhoneNumber, validateStudentId } from '../signup/custom-validations.directive';
import { NgClass, NgStyle, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle, NgIf, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  private router = inject(Router);

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  signinForm = this.formBuilder.group({
    // firstName: ['', [Validators.required, validateName()]],
    // middleName: ['', [Validators.required, validateName()]],
    // lastName: ['', [Validators.required, validateName()]],
    // gender: ['', [Validators.required]],
    // dateOfBirth: ['', [Validators.required, validateDateOfBirth()]],
    email: ['', [Validators.required, validateEmail()]],
    // phoneNumber: ['', [Validators.required, validatePhoneNumber()]],
    // studentId: ['', [Validators.required, validateStudentId()]],
    // stream: ['', [Validators.required]],
    // address: ['', [Validators.required]],
    password: ['', [Validators.required, validatePassword()]],
    // confirmPassword: ['', [Validators.required]],
  })




  onSubmit() {
    if (this.signinForm.valid) {
      const signinData = this.signinForm.value;

      this.http.post('http://localhost:8080/api/signin', signinData, { withCredentials: true }).subscribe({
        next: (response) => {
          console.log('Signin successful:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Signin failed:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
