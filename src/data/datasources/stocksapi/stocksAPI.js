import axios from 'axios';
import StockEntity from '../../entities/stockEntity';

export default class StocksAPI {
	baseUrl = 'http://localhost:8082';

	async getStocks(accessToken) {
		let endpoint = '/stocks';
		let result = [];

		try {
			let response = await axios.get(this.baseUrl + endpoint, {
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
			});

			response.data.forEach((stock) => {
				result.push(Object.assign(new StockEntity(), stock));
			});
		} catch (error) {
			console.info('Stocks endpoint could not be accessed');
		}

		return result;
	}
}
