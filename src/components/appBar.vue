<template>
	<nav>
		<n-menu
			:options="defaultMenu"
			v-model:value="activeKey"
			mode="horizontal"
		></n-menu>
		<n-menu
			v-if="authenticated === true"
			:options="authMenu"
			v-model:value="activeKey"
			mode="horizontal"
			class="authMenu"
		></n-menu>
		<n-menu
			v-if="authenticated === false"
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
	props: {
		authenticated: {
			type: Boolean,
		},
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
				label: () => h('a', { href: '/profile' }, 'Profile'),
				key: 'profile',
			},
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

		return {
			activeKey,
			defaultMenu,
			noAuthMenu,
			authMenu,
		};
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
