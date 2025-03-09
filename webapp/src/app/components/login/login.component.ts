import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { strongPasswordValidator } from '../../services/validators/password.validator';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthenticationService);
  router = inject(Router);
  loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, strongPasswordValidator()]],
    isAdmin: [false],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle form submission
      let request = this.loginForm.value;
      this.authService.getLogin(request).subscribe((res: any)=>{
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        alert("Login Successfully!");
        this.router.navigate(['/']);
      },
      (error)=>{
        alert("Error: " + error);
      });
    }
  }
}
