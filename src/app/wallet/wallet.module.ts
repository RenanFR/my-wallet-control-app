import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../shared/shared.module';
import { NotificationsModule } from '../views/notifications/notifications.module';
import { BankStatementEntriesComponent } from './bank-statement/entries/bank-statement-entries.component';
import { BankStatementListComponent } from './bank-statement/list/bank-statement-list.component';
import { BankStatementService } from './bank-statement/service/bank-statement.service';
import { BankStatementUploadComponent } from './bank-statement/upload/bank-statement-upload.component';
import { BankStatementUploadService } from './bank-statement/upload/service/bank-statement-upload.service';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { ExpenseCategoryService } from './expense-category/service/expense-category.service';
import { FinancialDashboardComponent } from './financial-dashboard/financial-dashboard.component';
import { WalletRoutingModule } from './wallet-routing.module';

@NgModule({
  declarations: [
    BankStatementEntriesComponent,
    BankStatementUploadComponent,
    FinancialDashboardComponent,
    BankStatementListComponent,
    ExpenseCategoryComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
    MatProgressBarModule,
    NotificationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    BankStatementUploadService,
    BankStatementService,
    ExpenseCategoryService
  ]
})
export class WalletModule { }
