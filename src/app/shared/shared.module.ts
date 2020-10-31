import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { isLoggedGuard } from './global/is.logged.guard';
import { RequestInterceptor } from './global/request.interceptor';
import { ErrorComponent } from './messages/error.component';
import { CategoriesFilterPipe } from './pipe/categories-filter.pipe';
import { TokenService } from './service/token.service';



@NgModule({
  declarations: [
    ErrorComponent,
    CategoriesFilterPipe
  ],
  exports: [
    ErrorComponent,
    AlertModule,
    ModalModule,
    CategoriesFilterPipe
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
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
