import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './messages/error.component';
import { isLoggedGuard } from './global/is.logged.guard';
import { TokenService } from './service/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './global/request.interceptor';



@NgModule({
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
  imports: [
    CommonModule
  ],
  providers: [
    isLoggedGuard,
    TokenService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true
    }
  ]
})
export class SharedModule { }
