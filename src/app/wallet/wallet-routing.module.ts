import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankStatementEntriesComponent } from './bank-statement/bank-statement-entries.component';
import { UploadComponent } from './upload/upload.component';
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
        path: 'entries/:account',
        component: BankStatementEntriesComponent,
        data: {
          title: 'Bank statement entries'
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
        path: 'upload',
        component: UploadComponent,
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
