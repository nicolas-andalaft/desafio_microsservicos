import { createRouter, createWebHistory } from 'vue-router';
import { LoginCallback, navigationGuard } from '@okta/okta-vue';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Profile from '@/views/Profile';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/login/callback',
		component: LoginCallback,
	},
	{
		path: '/profile',
		component: Profile,
		meta: {
			requiresAuth: true,
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});
router.beforeEach(navigationGuard);

export default router;
