import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.auth.IsAuth().pipe(
      tap((s) => {
        if (!s) {
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.auth.IsAuth().pipe(
      tap((s) => {
        if (!s) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
