import { StocksAllocationBySector } from './stocks.allocation.by.sector';
import { StocksAllocation } from './stocks.allocation';

export class UserStockMarketAllocation {
	
    _id: string;

    totalNumberStocks: number;

    totalValueInStocks: number;
    
    account: string;

    stocksAllocationPlanned: StocksAllocationBySector[];

    currentStocksAllocation: StocksAllocation[];

}
