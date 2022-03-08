import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default class SocketClient {
	constructor(messageCallback) {
		let client = Stomp.over(
			() => new SockJS('http://localhost:8082/stocks/listen')
		);

		client.configure({
			debug: () => {},
		});

		client.connect({}, () => {
			client.subscribe('/messages', messageCallback);
		});
	}
}
