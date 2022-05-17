import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map } from 'rxjs';
import { User } from '../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  initAuthListener() {
    this.auth.authState.subscribe((fuser) => console.log(fuser));
  }

  constructor(private auth: AngularFireAuth, private fs: AngularFirestore) {}

  newUser(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user!.uid, name, email);
        return this.fs.doc(`${user!.uid}/user`).set({...newUser})
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  IsAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser != null));
  }
}
