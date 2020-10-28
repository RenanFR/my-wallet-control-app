import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { INTERCEPTOR_SKIP_HEADER } from '../global/request.interceptor';
import { Login } from '../models/login';
import { OAuthToken } from '../models/token';

const tokenCheckUrl: string = `${environment.SERVER_URL}/oauth/check_token`;

@Injectable()
export class TokenService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    storeToken(token: OAuthToken): void {
        window.localStorage.setItem('token', JSON.stringify(token));
    }

    storeLogin(login: Login): void {
        window.localStorage.setItem('login', JSON.stringify(login));
    }

    removeToken(): void {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('login');
    }

    isTokenSet(): boolean {
        return !!window.localStorage.getItem('token');
    }

    public isTokenValid(token: string): Observable<boolean> {
        console.log('VALIDANDO O TOKEN: ' + token);
        const headers: HttpHeaders = new HttpHeaders()
            .append(INTERCEPTOR_SKIP_HEADER, 'true');
        let params: HttpParams = new HttpParams()
            .set('token', token);    
        return this
            .http
            .post<any>(tokenCheckUrl, params, { headers })
            .pipe(map(response => !!response.active))
            .pipe(catchError((error: HttpErrorResponse) => {
                if (error.status === 400) {
                    this.router.navigate(['/login']);
                    console.log('PROBLEMA AO VALIDAR O TOKEN: ' + error.error.error_description);
                }
                return of(false);
              }));
      }    

    getToken(): string {
        const token = JSON.parse(window.localStorage.getItem('token')) as OAuthToken;
        return `${token.token_type} ${token.access_token}`;
    }

    getTokenRaw(): string {
        const token = JSON.parse(window.localStorage.getItem('token')) as OAuthToken;
        return token.access_token;
    }    

    getUser(): Login {
        const user = JSON.parse(window.localStorage.getItem('login')) as Login;
        return user;
    }       

}