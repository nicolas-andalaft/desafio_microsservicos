<template>
	<n-space vertical>
		<div class="w=10" />
		<n-card size="small" v-for="index in listQnty()" v-bind:key="index">
			<n-space justify="space-between">
				{{ getMessage(index) }}
				{{ notifications[index]?.status }}
				<n-button text @click="onClose(index - 1)">
					<n-icon><MdClose /></n-icon>
				</n-button>
			</n-space>
		</n-card>
		<div class="w=10" />
		<n-button size="small" tertiary class="w-100" @click="push('/profile')">
			See all
		</n-button>
	</n-space>
</template>

<script>
import { NCard, NSpace, NButton, NIcon } from 'naive-ui';
import { MdClose } from '@vicons/ionicons4';

export default {
	components: {
		NCard,
		NSpace,
		NButton,
		NIcon,
		MdClose,
	},
	props: {
		onClose: {
			type: Function,
			default: null,
		},
		notifications: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		listQnty() {
			return Math.min(5, this.notifications.length);
		},
		push(path) {
			this.$router.push(path);
		},
		getMessage(index) {
			let notif = this.notifications[index - 1];
			let order = notif.order;
			console.log(notif.status);
			return (
				order.stock_name +
				' - ' +
				order.stock_symbol +
				' was ' +
				(order.status == 0 ? 'bought' : 'sold') +
				' by U$ ' +
				(notif.transaction_price * notif.transaction_volume).toFixed(2)
			);
		},
		close(index) {
			console.log('o porra');
			this.onClose(index);
		},
	},
};
</script>
