import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import {iif, Observable, of} from 'rxjs';
import { AuthService } from './auth.service';
import {concatMap, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      concatMap(_ => this.auth.handleAuthCallback()),
      concatMap(result => iif(() => result.loggedIn, of(true), this.auth.login(state.url).pipe(
        map(_ => false)))));
  }
}
