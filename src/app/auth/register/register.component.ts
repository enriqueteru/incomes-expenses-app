import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ui from 'src/app/core/state/actions/UI.action';
import { AppState } from 'src/app/core/state/reducers/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading?: boolean;

  error: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.store.select('ui').subscribe((ui) => (this.loading = ui.isLoading));
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    this.authService
      .newUser(
        this.registerForm.get('name')!.value,
        this.registerForm.get('email')!.value,
        this.registerForm.get('password')!.value
      )
      .then(() => {
        this.store.dispatch(ui.stopLoading()), this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        console.warn(err);
        this.error = err.message;
      });
  }
}
