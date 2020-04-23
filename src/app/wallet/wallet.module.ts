import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FinancialDashboardComponent } from './dashboard/financial-dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { UploadService } from './upload/upload.service';
import { SharedModule } from '../shared/shared.module';
import { FinancialDashboardService } from './dashboard/financial-dashboard.service';

@NgModule({
  declarations: [
    FinancialDashboardComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
    HttpClientModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UploadService,
    FinancialDashboardService
  ]
})
export class WalletModule { }
