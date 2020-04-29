import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BankStatementEntriesComponent } from './bank-statement/entries/bank-statement-entries.component';
import { BankStatementUploadComponent } from './bank-statement/upload/bank-statement-upload.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { BankStatementUploadService } from './bank-statement/upload/service/bank-statement-upload.service';
import { SharedModule } from '../shared/shared.module';
import { BankStatementEntriesService } from './bank-statement/entries/service/bank-statement-entries.service';
import { FinancialDashboardComponent } from './financial-dashboard/financial-dashboard.component';
import { BankStatementListComponent } from './bank-statement-list/bank-statement-list.component';

@NgModule({
  declarations: [
    BankStatementEntriesComponent,
    BankStatementUploadComponent,
    FinancialDashboardComponent,
    BankStatementListComponent
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
    BankStatementUploadService,
    BankStatementEntriesService
  ]
})
export class WalletModule { }
