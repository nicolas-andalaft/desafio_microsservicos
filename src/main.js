import { createApp } from 'vue';
import App from './App.vue';
import router from './core/router';
import OktaVue from '@okta/okta-vue';
import { oktaAuth } from './core/okta';

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
