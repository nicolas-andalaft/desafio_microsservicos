import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import OktaVue from '@okta/okta-vue';
import { oktaAuth } from '@/okta';
import OrdersAPI from '@/datasources/API/OrdersAPI';
import StocksAPI from '@/datasources/API/StocksAPI';
import OrdersController from '@/controllers/OrdersController';
import StocksController from '@/controllers/StocksController';

new OrdersController(new OrdersAPI());
new StocksController(new StocksAPI());

createApp(App)
	.use(router)
	.use(OktaVue, {
		oktaAuth,
		onAuthRequired: () => {
			router.push('/login');
		},
		onAuthResume: () => {
			router.push('/login');
		},
	})
	.mount('#app');
