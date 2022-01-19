export default class StockEntity {
	constructor(
		id,
		marketCap,
		stockSymbol,
		stockName,
		askMin,
		askMax,
		bidMin,
		bidMax,
		createdOn,
		updatedOn
	) {
		this.id = id;
		this.marketCap = marketCap;
		this.stockSymbol = stockSymbol;
		this.stockName = stockName;
		this.askMin = askMin;
		this.askMax = askMax;
		this.bidMin = bidMin;
		this.bidMax = bidMax;
		this.createdOn = createdOn;
		this.updatedOn = updatedOn;
	}

	static fromMap(map) {
		return new StockEntity(
			map.id,
			map.market_cap,
			map.stock_symbol,
			map.stock_name,
			map.ask_min,
			map.ask_max,
			map.bid_min,
			map.bid_max,
			map.created_on,
			map.updated_on
		);
	}
}
