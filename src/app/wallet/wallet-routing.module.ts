import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankStatementEntriesComponent } from './bank-statement/entries/bank-statement-entries.component';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { BankStatementListComponent } from './bank-statement/list/bank-statement-list.component';
import { BankStatementUploadComponent } from './bank-statement/upload/bank-statement-upload.component';
import { FinancialDashboardComponent } from './financial-dashboard/financial-dashboard.component';


const routes: Routes = [
  {
    path: '',
    data: { 
      title: 'Wallet'
    },
    children: [
      {
        path: '',
        redirectTo: 'upload'
      },
      {
        path: 'entries/:objectId',
        component: BankStatementEntriesComponent,
        data: {
          title: 'Bank statement entries'
        }
      },
      {
        path: 'uploads/:account',
        component: BankStatementListComponent,
        data: {
          title: 'Uploads'
        }
      },
      {
        path: 'dashboard/:account',
        component: FinancialDashboardComponent,
        data: {
          title: 'Financial Dashboard'
        }
      },
      {
        path: 'expenses/categories/:account',
        component: ExpenseCategoryComponent,
        data: {
          title: 'Expense categories'
        }
      },
      {
        path: 'upload',
        component: BankStatementUploadComponent,
        data: {
          title: 'Upload Bank Statement'
        }
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
