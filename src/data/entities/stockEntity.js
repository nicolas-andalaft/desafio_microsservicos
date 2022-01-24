export default class StockEntity {
	constructor(
		id,
		market_cap,
		stock_symbol,
		stock_name,
		ask_min,
		ask_max,
		bid_min,
		bid_max,
		created_on,
		updated_on
	) {
		(this.id = id),
			(this.market_cap = market_cap),
			(this.stock_symbol = stock_symbol),
			(this.stock_name = stock_name),
			(this.ask_min = ask_min),
			(this.ask_max = ask_max),
			(this.bid_min = bid_min),
			(this.bid_max = bid_max),
			(this.created_on = created_on),
			(this.updated_on = updated_on);
	}
}
