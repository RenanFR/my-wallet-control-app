import { Injectable } from "@angular/core";
import { OAuthToken } from '../models/token';
import { Login } from '../models/login';

@Injectable()
export class TokenService {

    constructor() { }

    storeToken(token: OAuthToken): void {
        window.localStorage.setItem('token', JSON.stringify(token));
    }

    // storeLogin(login: Login): void {
    //     window.localStorage.setItem('login', JSON.stringify(login));
    // }

    removeToken(): void {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('login');
    }

    isTokenSet(): boolean {
        return !!window.localStorage.getItem('token');
    }

    getToken(): string {
        const token = JSON.parse(window.localStorage.getItem('token')) as OAuthToken;
        return `${token.token_type} ${token.access_token}`;
    }

    getUserId(): string {
        const user = JSON.parse(window.localStorage.getItem('login')) as Login;
        return user.id;
    }    

}