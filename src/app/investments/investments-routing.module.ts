import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksAllocationComponent } from './stocks/stocks-allocation/stocks-allocation.component';
import { StocksPlanningComponent } from './stocks/stocks-planning/stocks-planning.component';
import { InvestmentsComponent } from './applications/investments.component';


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
        path: 'allocation',
        component: StocksAllocationComponent,
        data: {
          title: 'ALOCAÇÃO ATUAL DE AÇÕES'
        }
      },
      {
        path: 'planning',
        component: StocksPlanningComponent,
        data: {
          title: 'PLANEJAMENTO DE ALOCAÇÃO DE AÇÕES'
        }
      },
      {
        path: 'my',
        component: InvestmentsComponent,
        data: {
          title: 'MINHAS APLICAÇÕES FINANCEIRAS'
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
