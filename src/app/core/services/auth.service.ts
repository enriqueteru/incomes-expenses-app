import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import * as AuthAction from '../state/actions/Auth.action';
import * as ieAction from '../state/actions/incomesExpenses.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSuscription$?: Subscription;
  private _user: User = null;

  get user(): User {
    return this._user;
  }

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private store: Store
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {

        this.userSuscription$ = this.fs
        .doc(`${fuser.uid}/user`)
        .valueChanges()
        .subscribe((fsuser: any) => {
          const user: User = User.fromFirebase(fsuser);
          this._user = user;
          this.store.dispatch(AuthAction.setUser({ user }));

        });

      } else {


        this._user = null;
        this.userSuscription$?.unsubscribe();
        this.store.dispatch(AuthAction.unsetUser());
        this.store.dispatch(AuthAction.unsetUser());




      }
    });
  }

  newUser(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user!.uid, email, name);
        return this.fs
          .doc(`${user!.uid}/user`)
          .set({ uid: newUser.uid, name: newUser.name, email: newUser.email });
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.userSuscription$?.unsubscribe();
    this.store.dispatch(AuthAction.unsetUser());
    this.store.dispatch(ieAction.unsetItems());
    return this.auth.signOut();
  }

  IsAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser !== null));
  }
}
