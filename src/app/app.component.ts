import { Component, inject, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { Router } from 'express';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-4-registration';

  // router = inject(Router)

}
