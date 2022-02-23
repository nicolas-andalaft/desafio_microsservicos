import APIDatasource from '@/datasources/API/APIDatasource';

export default class StocksAPI {
	baseUrl = 'http://localhost:8082';

	async getStocks(accessToken) {
		let endpoint = '/stocks';

		return await APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	async getStock(accessToken, id) {
		let endpoint = '/stocks/' + id;

		return await APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	async getStockHistory(accessToken, id) {
		let endpoint = '/stocks/' + id + '/history';

		return await APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}
}
