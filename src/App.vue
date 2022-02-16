<template>
	<n-config-provider :theme="darkTheme">
		<app-bar ref="appBar" class="nav" />
		<n-dialog-provider><router-view /></n-dialog-provider>
	</n-config-provider>
</template>

<script>
import { NConfigProvider, darkTheme, NDialogProvider } from 'naive-ui';
import AppBar from '@/components/appBar';
import OrdersController from '@/controllers/OrdersController';

export default {
	components: {
		AppBar,
		NConfigProvider,
		NDialogProvider,
	},
	computed: {
		authenticated: function () {
			return this.$store.state.authenticated;
		},
	},
	watch: {
		authenticated: function (isAuthenticated) {
			if (isAuthenticated) this.updateData();
		},
	},
	setup() {
		return {
			darkTheme,
		};
	},
	beforeMount() {
		this.updateData();
	},
	methods: {
		async updateData() {
			let authenticated = await this.$auth.isAuthenticated();

			if (authenticated) {
				let token = await this.$auth.getAccessToken();
				this.$store.state.accessToken = token;

				let user = await this.$auth.getUser();
				let userResp = await OrdersController.getUser(token, user.email);

				Object.assign(user, userResp);
				this.$store.state.user = user;

				this.$refs.appBar.updateData(user, authenticated);
			}
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
.n-data-table-td {
	word-break: break-word;
}
</style>
