<template>
	<n-config-provider :theme="darkTheme">
		<nav>
			<app-bar :user="user" :logout="logout"></app-bar>
		</nav>
		<router-view />
	</n-config-provider>
</template>

<script>
import { NConfigProvider, darkTheme } from 'naive-ui';
import AppBar from '@/components/appBar';
import OrdersController from '@/controllers/OrdersController';

export default {
	name: 'app',
	data: function () {
		return {
			authenticated: false,
			user: null,
			logout: () => this.$auth.signOut(),
		};
	},
	components: {
		AppBar,
		NConfigProvider,
	},
	setup() {
		return {
			darkTheme,
		};
	},
	async created() {
		await this.isAuthenticated();
		this.$auth.authStateManager.subscribe(this.isAuthenticated);

		if (this.authenticated) {
			this.user = await this.$auth.getUser();
			let token = this.$auth.getAccessToken();

			let user = await OrdersController.getUser(token, this.user.email);

			Object.assign(this.user, user);
		}
	},
	watch: {
		// Everytime the route changes, check for auth status
		$route: 'isAuthenticated',
	},
	methods: {
		async isAuthenticated() {
			this.authenticated = await this.$auth.isAuthenticated();
		},
	},
};
</script>

<style>
body {
	background-color: #131315;
	color: white;
	padding: 0 20px 20px 20px;
}

nav {
	display: flex;
	justify-content: center;
}
</style>
