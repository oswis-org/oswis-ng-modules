import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService, private jwtHelperService: JwtHelperService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser') && !this.jwtHelperService.isTokenExpired(localStorage.getItem('currentUser'))) {
      return true;
    }
    console.log('calling refresh() from guard');
    this.authService.refresh().subscribe(() => this.authService.isLoggedIn());
    this.authService.setRedirectUrl(state.url);
    this.router.navigate(['/auth/requestPasswordReset']).then();
    return false;
  }
}


