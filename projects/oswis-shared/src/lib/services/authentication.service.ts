import {Inject, Injectable} from '@angular/core';
import {Observable, ReplaySubject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginResult} from '../models/login-result.model';
import {LoginResponse} from '../models/login-response.model';
import {Router, RouterStateSnapshot} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {AppUserActionModel} from '../models/app-user-action.model';
import {NotificationsService} from 'angular2-notifications';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {OSWIS_CONFIG} from "../config/oswis.config.token";
import {OswisConfig} from "../config/oswis.config";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public token: string;
  public refreshToken: string;
  snapshot: RouterStateSnapshot;
  public refreshing = false;
  protected loginCheckUrl;
  protected refreshTokenUrl;
  protected appUserActionUrl;
  private redirectUrl = '/';
  private readonly baseUrl;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private notificationService: NotificationsService,
    @Inject(OSWIS_CONFIG) private oswisConfig: OswisConfig
  ) {
    this.baseUrl = oswisConfig.backendApiUrl;

    this.loginCheckUrl = this.baseUrl + '/login_check';
    this.refreshTokenUrl = this.baseUrl + '/token/refresh';
    this.appUserActionUrl = this.baseUrl + '/app_user_action';

    this.snapshot = router.routerState.snapshot;
    this.token = tokenStorage.loadToken();
    this.refreshToken = tokenStorage.loadRefreshToken();
  }

  public static handleError(text: string, err: HttpErrorResponse) {
    const errorEvent = err.error instanceof ErrorEvent;
    const messageType = errorEvent ? 'Chyba na serveru:' : 'Chyba:';
    const message = errorEvent ? err.error.message : (typeof err.error.detail === 'string') ? err.error.detail : err.name;
    console.error(messageType, message);
    return throwError({status: err.status, title: text, message: message});
  }

  attemptAuth(username: string, password: string): Observable<Object> {
    console.log('Trying login with username ' + username + ' and some password (' + this.loginCheckUrl + ').');
    return this.http.post(this.loginCheckUrl, {username: username, password: password}, httpOptions);
  }

  login(username: string, password: string, persistent: boolean = false): Promise<LoginResult> {
    return this.attemptAuth(username, password)
      .map((response: any) => {
          console.log('Received answer from server.');
          const token = response && response.token;
          const refreshToken = response && response.refresh_token;
          if (token) { // requestPasswordReset successful if there's a jwt token in the response
            this.token = token; // set token property
            this.refreshToken = refreshToken;

            if (token && this.jwtHelper.isTokenExpired(this.token)) {
              return new LoginResult(false, 'Proběhlo automatické odhlášení.', null);
            }
            this.tokenStorage.storeToken(token);

            if (persistent && refreshToken) {
              this.tokenStorage.storeRefreshToken(refreshToken);
            }

            return new LoginResult(true, null, 'Přihlášení bylo úspěšné');
          } else {
            return new LoginResult(false, 'Špatné přihlašovací údaje.', null);
          }
        }
      ).toPromise().catch((err) => {
        return new LoginResult(false, 'Špatné přihlašovací údaje.', null);
      });
  }

  isAuthenticated(): boolean {
    const actualToken = this.tokenStorage.loadToken();
    return !(!actualToken || this.jwtHelper.isTokenExpired(actualToken));
  }

  isLoggedIn(): boolean {
    const actualToken = this.tokenStorage.loadToken();
    if ((!actualToken || this.jwtHelper.isTokenExpired(actualToken)) && !this.refreshing) {
      this.refreshing = true;
      this.refresh()
        .pipe(
          tap(x => {
            this.refreshing = false;
            if (!this.isAuthenticated()) {
              this.tokenStorage.removeRefreshToken();
            }
          }),
          catchError((err, resp) => {
            this.refreshing = false;
            if (!this.isAuthenticated()) {
              this.tokenStorage.removeRefreshToken();
            }
            return throwError(err);
          })
        ).subscribe();
    }
    return !actualToken ? false : !this.jwtHelper.isTokenExpired(actualToken);
  }

  getCurrentUser(): { roles: string[], username: string, iat: number, exp: number } {
    return !this.isAuthenticated() ? null : this.jwtHelper.decodeToken(this.tokenStorage.loadToken());
  }

  logout() {
    this.setAccessToken();
    this.setRefreshToken();
    const username = this.getCurrentUser().username;
    this.notificationService.info('Uživatel odhlášen', 'Uživatel ' + username + ' byl odhlášen ze systému.');
    console.log('User logged out. Navigating to root path...');
    this.router.navigate(['/']).then();
  }

  setRedirectUrl(redirectUrl: string): void {
    this.redirectUrl = redirectUrl;
  }

  popRedirectUrl(): string {
    const currentRedirectUrl = this.redirectUrl ? this.redirectUrl : '';
    this.redirectUrl = '/';
    return currentRedirectUrl;
  }

  getAccessToken(): string {
    return this.tokenStorage.loadToken();
  }

  getRefreshToken(): string {
    return this.tokenStorage.loadRefreshToken();
  }

  refresh(): Observable<LoginResponse> {
    if (!this.getRefreshToken()) {
      return new Observable<LoginResponse>();
    }

    console.log('Try to refresh JWT...');

    const body = new HttpParams().set('refresh_token', this.getRefreshToken());
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const refreshObservable = this.http.post<LoginResponse>(this.refreshTokenUrl, body.toString(), {headers});
    const refreshSubject = new ReplaySubject<LoginResponse>(1);
    refreshSubject.subscribe((r: LoginResponse) => {
      // console.log('Token refreshed.');
      this.setAccessToken(r.token);
      this.setRefreshToken(r.refresh_token);
    }, (err) => {
      this.handleAuthenticationError(err);
    });

    refreshObservable.subscribe(refreshSubject);
    return refreshSubject;
  }

  appUserAction(newEntity: AppUserActionModel): Observable<AppUserActionModel> {
    return this.http.post<AppUserActionModel>(this.appUserActionUrl, newEntity)
      .pipe(
        tap(x => {
          const title = 'Požadavek na změnu účtu odeslán.';
          const message = 'Požadovaná akce s účtem byla provedena.';
          this.notificationService.success(title, message);
        }),
        catchError((err, caught) => {
          const errorMessage = 'Nepodařilo se provést požadovanou akci s účtem.';
          AuthenticationService.handleError(errorMessage, err);
          return new Observable<AppUserActionModel>();
        })
      );
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']).then();
  }

  redirectToPasswordChange() {
    this.router.navigate(['/auth/password-change']).then();
  }

  redirectToPasswordChangeRequest() {
    this.router.navigate(['/auth/password-change-request']).then();
  }

  private handleAuthenticationError(err: any) { // TODO: Only for authentication error codes
    console.log('Problem with JWT.');
    this.setAccessToken();
    this.setRefreshToken();
  }

  private setAccessToken(accessToken?: string) {
    !accessToken ? this.tokenStorage.removeToken() : this.tokenStorage.storeToken(accessToken);
  }

  private setRefreshToken(refreshToken?: string) {
    !refreshToken ? this.tokenStorage.removeRefreshToken() : this.tokenStorage.storeRefreshToken(refreshToken);
  }
}
