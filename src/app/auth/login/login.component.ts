import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.auth
      .login(
        this.loginForm.get('email')!.value,
        this.loginForm.get('password')!.value
      )
      .then((c) => console.log(c))
      .catch((e) => console.log(e));
  }
}
