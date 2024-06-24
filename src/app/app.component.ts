import { Component, inject, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { Router } from 'express';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NameEditorComponent, ProfileEditorComponent, RegistrationFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-4-registration';

  // router = inject(Router)

}
