import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ui from 'src/app/core/state/actions/UI.action';
import * as auth from 'src/app/core/state/actions/Auth.action';
import { AppState } from 'src/app/core/state/reducers/app.reducer';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';
  loading?: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.store.select('ui').subscribe((ui) => (this.loading = ui.isLoading));
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());

    this.auth
      .login(
        this.loginForm.get('email')!.value,
        this.loginForm.get('password')!.value
      )
      .then((c) => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((e) => {
        this.store.dispatch(ui.stopLoading());
        console.log(e), (this.error = e.message);
      });
  }
}
