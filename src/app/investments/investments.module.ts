import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InvestmentsRoutingModule } from './investments-routing.module';
import { StocksAllocationComponent } from './stocks/stocks-allocation/stocks-allocation.component';
import { StocksPlanningComponent } from './stocks/stocks-planning/stocks-planning.component';
import { StocksService } from './stocks/stocks.service';



@NgModule({
  declarations: [
    StocksPlanningComponent,
    StocksAllocationComponent    
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    InvestmentsRoutingModule

  ],
  providers: [
    StocksService
  ]
})
export class InvestmentsModule { }
