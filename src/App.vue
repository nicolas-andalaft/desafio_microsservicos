<template>
	<n-config-provider :theme="darkTheme">
		<app-bar :authenticated="authenticated" :logout="logout" class="nav" />
		<n-dialog-provider><router-view /></n-dialog-provider>
	</n-config-provider>
</template>

<script>
import { NConfigProvider, darkTheme, NDialogProvider } from 'naive-ui';
import AppBar from '@/components/appBar';
import OrdersController from '@/controllers/OrdersController';

export default {
	data: function () {
		return {
			authenticated: false,
			logout: () => this.$auth.signOut(),
		};
	},
	components: {
		AppBar,
		NConfigProvider,
		NDialogProvider,
	},
	setup() {
		return {
			darkTheme,
		};
	},
	async beforeMount() {
		await this.isAuthenticated();
		this.$auth.authStateManager.subscribe(this.isAuthenticated);

		if (this.authenticated) {
			let token = this.$auth.getAccessToken();
			this.$store.state.accessToken = token;

			let user = await this.$auth.getUser();
			let userResp = await OrdersController.getUser(token, user.email);

			Object.assign(user, userResp);
			this.$store.state.user = user;
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
</style>
