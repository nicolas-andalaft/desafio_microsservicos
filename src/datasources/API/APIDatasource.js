import axios from 'axios';

export default class APIDatasource {
	static async get(url, accessToken) {
		try {
			let response = await axios.get(url, {
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
			});

			return response.data;
		} catch (error) {
			console.info('URl could not be accessed');
			console.info(error);
			return null;
		}
	}

	static async post(url, accessToken, body) {
		try {
			let response = await axios.post(url, {
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
				body: body,
			});

			return response.data;
		} catch (error) {
			console.info(url + ' could not be accessed');
			console.info(error);
			return null;
		}
	}
}
