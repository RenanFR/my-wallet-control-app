import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BankStatementEntriesComponent } from './bank-statement/bank-statement-entries.component';
import { UploadComponent } from './upload/upload.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { UploadService } from './upload/upload.service';
import { SharedModule } from '../shared/shared.module';
import { BankStatementEntriesService } from './bank-statement/bank-statement-entries.service';
import { FinancialDashboardComponent } from './financial-dashboard/financial-dashboard.component';

@NgModule({
  declarations: [
    BankStatementEntriesComponent,
    UploadComponent,
    FinancialDashboardComponent
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
    BankStatementEntriesService
  ]
})
export class WalletModule { }
