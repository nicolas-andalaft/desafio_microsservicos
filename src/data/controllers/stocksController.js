import StocksApi from '../datasources/stocksapi/stocksAPI';

export default class StocksController {
	constructor() {
		this.datasource = new StocksApi();
	}

	getStocks(accessToken) {
		return this.datasource.getStocks(accessToken);
	}
}
