import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  createUser() {
    this.authService.newUser('enrique', 'info@', '2321432432')
  }
}
