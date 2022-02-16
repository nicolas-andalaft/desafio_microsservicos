<template>
	<nav>
		<n-menu :options="defaultMenu" mode="horizontal"></n-menu>
		<n-menu
			v-if="authenticated === true"
			:options="authMenu"
			mode="horizontal"
			class="authMenu"
		></n-menu>
		<n-menu v-else :options="noAuthMenu" mode="horizontal"></n-menu>
	</nav>
</template>

<script>
import { h } from 'vue';
import { NIcon, NMenu } from 'naive-ui';
import { MdPerson, MdCash, MdExit, MdContact } from '@vicons/ionicons4';
import { RouterLink } from 'vue-router';

function renderIcon(icon) {
	return () => h(NIcon, null, { default: () => h(icon) });
}

export default {
	components: {
		NMenu,
	},
	data() {
		return {
			authenticated: false,
			user: {},
			activeKey: '',
			defaultMenu: [],
			noAuthMenu: [],
			authMenu: [],
		};
	},
	beforeMount() {
		let logout = () => this.$auth.signOut();

		this.defaultMenu = [
			{
				label: () => h(RouterLink, { to: '/' }, { default: () => 'Home' }),
				key: 'home',
			},
		];
		this.noAuthMenu = [
			{
				label: () =>
					h(RouterLink, { to: '/login' }, { default: () => 'Login' }),
				key: 'login',
				icon: renderIcon(MdContact),
			},
		];
		this.authMenu = [
			{
				label: () =>
					h(RouterLink, { to: '/profile' }, { default: () => 'Profile' }),
				key: 'profile',
			},
			{
				label: () =>
					h(
						'a',
						{},
						this.user?.dollar_balance ? 'U$ ' + this.user?.dollar_balance : ''
					),
				icon: renderIcon(MdCash),
				key: 'balance',
			},
			{
				label: () => h('a', {}, this.user?.name),
				key: 'username',
				icon: renderIcon(MdPerson),
				children: [
					{
						label: () => h('a', { onclick: logout }, 'Logout'),
						icon: renderIcon(MdExit),
						key: 'logout',
					},
				],
			},
		];
	},
	methods: {
		updateData(user, authenticated) {
			this.user = user;
			this.authenticated = authenticated;
		},
	},
};
</script>

<style>
nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 4rem;
}
.authMenu {
	display: contents !important;
}
.authMenu :nth-child(1) {
	margin-right: auto !important;
}
</style>
