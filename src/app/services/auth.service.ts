import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { User } from '../core/models/user.model';
import * as AuthAction from '../core/state/actions/Auth.action';
import * as ieAction from '../core/state/actions/incomesExpenses.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSuscription$?: Subscription;
  private _user: User = {} as User;

  get user(): User{
    return this._user;
  }

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private store: Store
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (!fuser) {
        this._user = {} as User;
        this.userSuscription$?.unsubscribe();
        this.store.dispatch(AuthAction.unsetUser())
        this.store.dispatch(ieAction.unsetItems())
      } else {
        this.userSuscription$ = this.fs
          .doc(`${fuser.uid}/user`)
          .valueChanges()
          .subscribe((fsuser: any) => {
            const user: User = User.fromFirebase(fsuser);
            this._user = user;
            this.store.dispatch(AuthAction.setUser({ user }));
          });
      }
    });
  }



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
    this.userSuscription$?.unsubscribe();
    this.store.dispatch(AuthAction.unsetUser());
    this.store.dispatch(ieAction.unsetItems())
    return this.auth.signOut();
  }

  IsAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser != null));
  }
}
