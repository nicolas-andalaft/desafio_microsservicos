<template>
	<nav>
		<n-menu
			:options="defaultMenu"
			v-model:value="activeKey"
			mode="horizontal"
		></n-menu>
		<n-menu
			v-if="user !== null"
			:options="authMenu"
			v-model:value="activeKey"
			mode="horizontal"
			class="authMenu"
		></n-menu>
		<n-menu
			v-if="user === null"
			:options="noAuthMenu"
			v-model:value="activeKey"
			mode="horizontal"
		></n-menu>
	</nav>
</template>

<script>
import { h } from 'vue';
import { NMenu, NIcon } from 'naive-ui';
import { MdPerson, MdCash, MdExit, MdContact } from '@vicons/ionicons4';

function renderIcon(icon) {
	return () => h(NIcon, null, { default: () => h(icon) });
}

export default {
	components: {
		NMenu,
	},
	this: {
		logout: null,
	},
	data() {
		return {
			user: null,
			activeKey: 'home',
			defaultMenu: [],
			noAuthMenu: [],
			authMenu: [],
		};
	},
	beforeMount() {
		this.user = this.$store.state.user;

		this.defaultMenu = [
			{
				label: () => h('a', { href: '/', class: 'grow' }, 'Home'),
				key: 'home',
			},
		];
		this.noAuthMenu = [
			{
				label: () => h('a', { href: '/login' }, 'Login'),
				key: 'login',
				icon: renderIcon(MdContact),
			},
		];
		this.authMenu = [
			{
				label: () => h('a', { href: '/profile' }, 'Profile'),
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
						label: () => h('a', { onclick: this.logout }, 'Logout'),
						icon: renderIcon(MdExit),
						key: 'logout',
					},
				],
			},
		];
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
