import { createRouter, createWebHistory } from 'vue-router';
import { LoginCallback, navigationGuard } from '@okta/okta-vue';
import Home from '@/views/Home';
import Login from '@/views/Login';

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
