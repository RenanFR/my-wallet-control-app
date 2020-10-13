import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Login } from '../../shared/models/login';
import { OAuthToken } from '../../shared/models/token';
import { AuthService } from '../../shared/service/auth.service';
import { TokenService } from '../../shared/service/token.service';

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
    console.log('ENVIOU O FORMULÁRIO DE AUTENTICAÇÃO');
    this.authService
        .getToken(this.login.userEmail, this.login.password)
        .pipe(flatMap((token: OAuthToken) => {
          this.tokenService.storeToken(token);
          return this.authService.getUserInfo();
        }))
        .pipe(catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            Swal.fire('Erro!', 'Não foi possível autenticar, verifique suas credenciais', 'error');
          }
          return throwError(error);
        }))
        .subscribe((login: Login) => {
          this.tokenService.storeLogin(login);
          this.router.navigateByUrl('/dashboard');
        });
  }
  
 }
