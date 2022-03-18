<template>
	<nav>
		<n-space class="nav-items">
			<n-button text @click="this.push('/')">Home</n-button>
		</n-space>

		<n-space v-if="authenticated === true" class="authMenu nav-items">
			<n-button text @click="this.push('/profile')">Profile</n-button>

			<n-popover :show-arrow="false" :raw="notifications.length == 0">
				<template #trigger>
					<n-button text>
						<template #icon>
							<n-badge :value="notifications.length" :max="99">
								<n-icon color="white"><MdNotifications /></n-icon>
							</n-badge>
						</template>
					</n-button>
				</template>
				<notifications-menu
					:notifications="notifications"
					:onClose="closeNotif"
				/>
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
import { NIcon, NPopover, NButton, NBadge, NSpace } from 'naive-ui';
import {
	MdPerson,
	MdCash,
	MdExit,
	MdContact,
	MdNotifications,
} from '@vicons/ionicons4';
import NotificationsMenu from '@/components/notificationsMenu';
import OrdersController from '@/controllers/OrdersController';

export default {
	components: {
		NPopover,
		NButton,
		NIcon,
		NBadge,
		NSpace,
		MdPerson,
		MdCash,
		MdExit,
		MdContact,
		MdNotifications,
		NotificationsMenu,
	},
	data() {
		return {
			authenticated: false,
			user: {},
			activeKey: '',
			noAuthMenu: [],
			authMenu: [],
			notifications: [],
		};
	},
	setup() {
		return {
			OrdersController,
		};
	},
	methods: {
		updateData(user, authenticated) {
			this.user = user;
			this.authenticated = authenticated;

			this.OrdersController.getUserOrdersHistory(
				this.$store.state.accessToken,
				this.user,
				'1'
			).then((result) => (this.notifications = result));
		},
		logout() {
			this.$auth.signOut();
		},
		push(path) {
			this.$router.push(path);
		},
		closeNotif(index) {
			OrdersController.disableUserOrderHistory(
				this.$store.state.accessToken,
				this.notifications[index]
			).then(() => this.notifications.splice(index, 1));
		},
	},
};
</script>
