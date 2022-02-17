import APIDatasource from '@/datasources/API/APIDatasource';

export default class StocksAPI {
	baseUrl = 'http://localhost:8082';

	async getStocks(accessToken) {
		let endpoint = '/stocks';

		return await APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}
}
