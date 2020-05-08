import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksPlanningComponent } from './stocks/stocks-planning/stocks-planning.component';
import { StocksAllocationComponent } from './stocks/stocks-allocation/stocks-allocation.component';


const routes: Routes = [
  {
    path: '',
    data: { 
      title: 'MEUS INVESTIMENTOS'
    },
    children: [
      {
        path: '',
        redirectTo: 'allocation/421129-4'
      },
      {
        path: 'allocation/:accountId',
        component: StocksAllocationComponent,
        data: {
          title: 'ALOCAÇÃO ATUAL DE AÇÕES'
        }
      },
      {
        path: 'planning/:accountId',
        component: StocksPlanningComponent,
        data: {
          title: 'PLANEJAMENTO DE ALOCAÇÃO DE AÇÕES'
        }
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule { }
