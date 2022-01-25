export default class StocksController {
	static datasource;

	constructor(datasource) {
		if (!StocksController.datasource) StocksController.datasource = datasource;
	}

	static async getStocks(accessToken) {
		return await StocksController.datasource.getStocks(accessToken);
	}
}
