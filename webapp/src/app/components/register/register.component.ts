import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { strongPasswordValidator } from '../../services/validators/password.validator';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthenticationService);
  router = inject(Router);
  registerForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, strongPasswordValidator()]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      let request = this.registerForm.value;
      // Handle form submission
      this.authService.getRegister(request).subscribe((res)=>{
        alert("Register Successfully!");
        this.router.navigate(['/']);
      },
      (error)=>{
        alert("Error: " + error);
      });
    }
  }
}
