import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/internal/operators/share';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { INTERCEPTOR_SKIP_HEADER } from '../global/request.interceptor';
import { Login } from '../models/login';
import { OAuthToken } from '../models/token';

const tokenUrl: string = `${environment.SERVER_URL}/oauth/token`;
const baseUrl: string = `${environment.SERVER_URL}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getToken(username: string, password: string): Observable<OAuthToken> {
    console.log('REALIZANDO CHAMADA DE AUTENTICAÇÃO AO SERVIDOR');
    const headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append(INTERCEPTOR_SKIP_HEADER, 'true')
        .append('Authorization', 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret));
    let body: HttpParams = new HttpParams()
        .set('grant_type', 'password')
        .set('username', username)
        .set('password', password);
    return this.http.post<OAuthToken>(tokenUrl, body, { headers }).pipe(tap(token => {
      console.log('RESPOSTA APÓS AUTENTICAÇÃO: ' + token.access_token);
    }));
  }

  public registerUser(login: Login): Observable<any> {
    return this.http.post(baseUrl, login);
  }

  public getUserInfo(): Observable<Login> {
    return this.http.get<Login>(baseUrl);
  }

}
