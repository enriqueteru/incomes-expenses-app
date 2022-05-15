import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  error: string = ""
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService
      .newUser(
        this.registerForm.get('name')!.value,
        this.registerForm.get('email')!.value,
        this.registerForm.get('password')!.value
      )
      .then(() => this.router.navigate(["/"]))
      .catch((err) => {console.warn(err); this.error = err.message});
  }
}
