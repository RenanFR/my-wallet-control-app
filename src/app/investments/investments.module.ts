import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NotificationsModule } from '../views/notifications/notifications.module';
import { InvestmentsComponent } from './applications/investments.component';
import { InvestmentsRoutingModule } from './investments-routing.module';
import { StocksAllocationComponent } from './stocks/stocks-allocation/stocks-allocation.component';
import { StocksPlanningComponent } from './stocks/stocks-planning/stocks-planning.component';
import { StocksService } from './stocks/stocks.service';
import { InvestmentsService } from './investments.service';



@NgModule({
  declarations: [
    StocksPlanningComponent,
    StocksAllocationComponent,
    InvestmentsComponent    
  ],
  imports: [
    CommonModule,
    SharedModule,
    InvestmentsRoutingModule,
    NotificationsModule,
    FormsModule

  ],
  providers: [
    StocksService,
    InvestmentsService
  ]
})
export class InvestmentsModule { }
