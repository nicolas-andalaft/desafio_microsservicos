<template>
	<n-menu
		:options="menuOptions.value"
		v-model:value="activeKey"
		mode="horizontal"
		class="navbar"
	></n-menu>
</template>

<script>
import { h, ref } from 'vue';
import { NMenu, NIcon } from 'naive-ui';
import { MdPerson, MdCash, MdExit, MdContact } from '@vicons/ionicons4';

function renderIcon(icon) {
	return () => h(NIcon, null, { default: () => h(icon) });
}

export default {
	props: {
		user: {},
		logout: null,
	},
	components: {
		NMenu,
	},
	setup(props) {
		let activeKey = 'home';
		const defaultMenu = [
			{
				label: () => h('a', { href: '/', class: 'grow' }, 'Home'),
				key: 'home',
			},
		];
		const noAuthMenu = [
			{
				label: () => h('a', { href: '/login' }, 'Login'),
				key: 'login',
				icon: renderIcon(MdContact),
			},
		];
		const authMenu = [
			{
				label: () =>
					h(
						'a',
						{},
						props.user?.dollar_balance ? 'U$ ' + props.user?.dollar_balance : ''
					),
				icon: renderIcon(MdCash),
				key: 'balance',
			},
			{
				label: () => h('a', {}, props.user?.name),
				key: 'username',
				icon: renderIcon(MdPerson),
				children: [
					{
						label: () => h('a', { onclick: props.logout }, 'Logout'),
						icon: renderIcon(MdExit),
						key: 'logout',
					},
				],
			},
		];

		let menuOptions = ref(defaultMenu);
		menuOptions.value = defaultMenu;
		return {
			activeKey,
			defaultMenu,
			noAuthMenu,
			authMenu,
			menuOptions,
		};
	},
	beforeMount() {
		this.updateAppBar();
	},
	methods: {
		async updateAppBar() {
			let authenticated = await this.$auth.isAuthenticated();

			if (authenticated) {
				this.menuOptions.value = [...this.defaultMenu, ...this.authMenu];
			} else {
				this.menuOptions.value = [...this.defaultMenu, ...this.noAuthMenu];
			}
		},
	},
};
</script>

<style>
.navbar {
	width: 100%;
	height: 3.5rem;
	align-items: center;
}
.navbar :first-child {
	flex-grow: 1;
}
.grow {
	flex-grow: 1;
}
</style>
