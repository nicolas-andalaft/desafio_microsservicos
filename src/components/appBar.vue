<template>
	<nav>
		<n-space class="nav-items">
			<n-button text @click="this.push('/')">Home</n-button>
		</n-space>

		<n-space v-if="authenticated === true" class="authMenu nav-items">
			<n-button text @click="this.push('/profile')">Profile</n-button>

			<n-popover :show-arrow="false">
				<template #trigger>
					<n-button text>
						<template #icon>
							<n-icon><MdNotifications /></n-icon>
						</template>
					</n-button>
				</template>
				<n-space vertical> </n-space>
			</n-popover>

			<n-button text>
				<template #icon>
					<n-icon><MdCash /></n-icon>
				</template>
				{{ this.user?.dollar_balance ? 'U$ ' + this.user?.dollar_balance : '' }}
			</n-button>

			<n-popover :show-arrow="false">
				<template #trigger>
					<n-button text>
						<template #icon>
							<n-icon><MdPerson /></n-icon>
						</template>
						{{ this.user?.name }}
					</n-button>
				</template>
				<n-button text @click="logout">
					<template #icon>
						<n-icon><MdExit /></n-icon>
					</template>
					Log Out
				</n-button>
			</n-popover>
		</n-space>

		<n-space v-if="authenticated === false" class="nav-items">
			<n-button text @click="push('/login')">
				<template #icon>
					<n-icon><MdContact /></n-icon>
				</template>
				Login
			</n-button>
		</n-space>
	</nav>
</template>

<script>
import { NIcon, NPopover, NButton } from 'naive-ui';
import {
	MdPerson,
	MdCash,
	MdExit,
	MdContact,
	MdNotifications,
} from '@vicons/ionicons4';

export default {
	components: {
		NPopover,
		NButton,
		NIcon,
		MdPerson,
		MdCash,
		MdExit,
		MdContact,
		MdNotifications,
	},
	data() {
		return {
			authenticated: false,
			user: {},
			activeKey: '',
			noAuthMenu: [],
			authMenu: [],
		};
	},
	methods: {
		updateData(user, authenticated) {
			this.user = user;
			this.authenticated = authenticated;
		},
		logout() {
			this.$auth.signOut();
		},
		push(path) {
			this.$router.push(path);
		},
	},
};
</script>
