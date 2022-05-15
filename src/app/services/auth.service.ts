import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  newUser(name: string, email: string, password: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => console.log('user Registered ---> ', userData))
      .catch((err) => console.warn(err));
  }
}
