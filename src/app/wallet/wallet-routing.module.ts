import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialDashboardComponent } from './dashboard/financial-dashboard.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Wallet'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
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
