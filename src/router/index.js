import { createRouter, createWebHistory } from 'vue-router';
import { LoginCallback, navigationGuard } from '@okta/okta-vue';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/login/callback',
		component: LoginCallback,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(navigationGuard);

export default router;
