import { Component, inject } from '@angular/core';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [],
  templateUrl: './registration.component.html',

})
export class RegistrationComponent {

  formService = inject(FormService);
  data = JSON.stringify(this.formService.data);
}
