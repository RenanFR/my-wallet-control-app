import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { FinancialDashboardComponent } from './dashboard/financial-dashboard.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    FinancialDashboardComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule
  ]
})
export class WalletModule { }
