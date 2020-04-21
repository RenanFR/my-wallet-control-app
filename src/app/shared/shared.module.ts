import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './messages/error.component';



@NgModule({
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
