import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { validateDateOfBirth, validateEmail, validateName, validatePassword, validatePhoneNumber, validateStudentId } from './custom-validations.directive';
import { NgClass, NgStyle, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private router = inject(Router);

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  signupForm = this.formBuilder.group({
    // firstName: ['', [Validators.required, validateName()]],
    // middleName: ['', [Validators.required, validateName()]],
    // lastName: ['', [Validators.required, validateName()]],

    email: ['', [Validators.required, validateEmail()]],

    password: ['', [Validators.required, validatePassword()]],
    // confirmPassword: ['', [Validators.required]],
  });

  passwordMatchValidator(formGroup: FormGroup) {
    if (formGroup.get('password') == null || formGroup.get('confirmPassword') == null) {
      return { rquired: true };
    }
    return formGroup.get('password')!.value === formGroup.get('confirmPassword')!.value ? null : { mismatch: true };
  }


  onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      this.http.post('http://localhost:8080/api/signup', signupData).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          console.error('Signup failed:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
