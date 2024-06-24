import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../services/form-service';
import { Router } from '@angular/router';
import { forbiddenNameValidator } from '../profile-editor/forbidden-name.directive';
import { NgClass, NgStyle, NgIf } from '@angular/common';
import { validateEmail, validateName, validateStudentId } from './custom-validations.directive';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle, NgIf],
  templateUrl: './registration-form.component.html',

})
export class RegistrationFormComponent {

  private formService = inject(FormService);
  private router = inject(Router);  // Inject Router
  // constructor(private router: Router) { }
  isEmpty = true;
  private isValid = false;




  registrationform = new FormGroup({
    firstName: new FormControl('', [Validators.required, validateName()]),
    middleName: new FormControl('', [Validators.required, validateName()]),
    lastName: new FormControl('', [Validators.required, validateName()]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, validateEmail()]),
    studentId: new FormControl('', [Validators.required, validateStudentId()]),
    stream: new FormControl('', [Validators.required]),

  })




  onSubmit() {
    if (this.registrationform.valid) {
      this.formService.setData(this.registrationform.value);
      console.warn(this.registrationform.value);
      console.log('data from service', this.formService.data);
      this.router.navigate(['/confirm-registration']);
    } else {
      console.error('Form is invalid');
    }
  }

}
