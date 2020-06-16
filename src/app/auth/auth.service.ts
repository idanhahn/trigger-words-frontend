import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import {from, of, Observable, BehaviorSubject, combineLatest, throwError, Subscription, iif} from 'rxjs';
import {tap, catchError, concatMap, shareReplay, delay, take, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  refreshSub: Subscription;

  auth0Client$: Observable<Auth0Client> = from(
    createAuth0Client({
      domain: environment.auth0.domain,
      client_id: environment.auth0.client_id,
      redirect_uri: environment.auth0.redirect_uri,
      audience: environment.auth0.audience
    })).pipe(shareReplay(1), catchError(err => throwError(err)));

  isAuthenticated$ = this.auth0Client$.pipe(concatMap((client: Auth0Client) =>
    from(client.isAuthenticated())));

  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback())));

  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();

  constructor(public router: Router) {}

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(concatMap((client: Auth0Client) =>
      from(client.getTokenSilently(options))));
  }

  login(redirectPath: string = '/home/dashboard'): Observable<void> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) =>
        client.loginWithRedirect({
          redirect_uri: environment.auth0.redirect_uri,
          appState: { target: redirectPath }
        })));
  }

  // TODO: fix need to reload page to get user name bug
  handleAuthCallback(): Observable<{ loggedIn: boolean; targetUrl: string }> {
    return of(window.location.search).pipe(
      concatMap(params =>
        iif(() => params.includes('code=') && params.includes('state='),
          this.handleRedirectCallback$.pipe(
            concatMap(cbRes => this.isAuthenticated$.pipe(
              take(1),
              map(loggedIn => ({ loggedIn,
                targetUrl: cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/'
              })),
            ))
          ),
          this.isAuthenticated$.pipe(take(1), map(loggedIn => ({ loggedIn, targetUrl: null }))))));
  }

  logout() {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: environment.auth0.client_id,
        returnTo: environment.auth0.logout_url
      });
    });
  }
}
