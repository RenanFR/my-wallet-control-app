import { Component } from '@angular/core';
import { Login } from '../../shared/models/login';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/service/token.service';
import { switchMap, flatMap } from 'rxjs/operators';
import { OAuthToken } from '../../shared/models/token';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  login: Login = new Login();

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  authenticate(): void {
    console.log('authenticate()');
    this.authService
        .getToken(this.login.userEmail, this.login.password)
        .pipe(flatMap((token: OAuthToken) => {
          console.log(token);
          this.tokenService.storeToken(token);
          return this.authService.getUserInfo();
        }))
        .subscribe((login: Login) => {
          console.log(login);
          // this.tokenService.storeLogin(login);
          this.router.navigateByUrl('/dashboard');
        });
  }
  
 }
