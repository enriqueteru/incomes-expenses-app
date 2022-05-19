import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';

import { map, Subscription } from 'rxjs';
import { User } from '../core/models/user.model';
import * as AuthAction from '../core/state/actions/Auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
userSuscription$?: Subscription;

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (!fuser) {
        this.userSuscription$?.unsubscribe()
      } else {
        this.userSuscription$ = this.fs
          .doc(`${fuser.uid}/user`)
          .valueChanges()
          .subscribe((fsuser: any) => {
            const user: User = User.fromFirebase(fsuser)
            this.store.dispatch(AuthAction.setUser({user}))
          });
      }
    });
  }

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private store: Store
  ) {}

  newUser(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user!.uid, name, email);
        return this.fs.doc(`${user!.uid}/user`).set({ ...newUser });
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.store.dispatch(AuthAction.unsetUser());
    return this.auth.signOut();
  }

  IsAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser != null));
  }
}
