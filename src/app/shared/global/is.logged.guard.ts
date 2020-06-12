import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from '../service/token.service';

@Injectable()
export class isLoggedGuard implements CanActivate {

    constructor(
        private tokenService: TokenService,
        private router: Router
    ){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.tokenService.isTokenSet()) {
            let token = this.tokenService.getToken();
            if (!!token) {
                return true;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}