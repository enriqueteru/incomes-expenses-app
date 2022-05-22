import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/core/state/reducers/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {

  name: string = '';
  userSus!: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private _s: Store<AppState>) {}

  ngOnInit() {
    this.userSus = this._s.select('auth').subscribe((auth) => this.name = auth.user.name);

  }

  logout() {
    this.auth
      .logout()
      .then(() => {
        this.router.navigate(["/login"]),
        this.userSus.unsubscribe()})
      .catch((e) => console.warn(e));
  }
}
