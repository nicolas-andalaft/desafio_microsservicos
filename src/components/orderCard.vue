<template>
	<n-card class="item-card" hoverable>
		<h2>
			<n-icon><md-cash /></n-icon>
			{{ order.type == 0 ? 'Buy' : 'Sell' }} order
		</h2>
		<h4 class="subtitle">{{ order.stock_name }} - {{ order.stock_symbol }}</h4>

		<n-space align="center" vertical>
			<n-h1 class="card-info">
				<n-text type="primary"> U$ {{ order.price }} </n-text>
			</n-h1>
			<n-h1 class="card-info">
				<n-text type="primary"> {{ order.volume }} volumes </n-text>
			</n-h1>

			<n-switch
				:value="order.status == 1"
				@update:value="handleChange"
				class="m-10"
			>
				<template #checked>Opened</template>
				<template #unchecked>Closed</template>
			</n-switch>
		</n-space>

		<template #footer>
			<n-space justify="space-around">
				<n-tag size="medium" class="tag-label">
					<p>Created</p>
					<n-time :time="new Date(order.created_on)" type="relative" />
				</n-tag>

				<n-tag size="medium" type="info" class="tag-label">
					<p>Last Updated</p>
					<n-time :time="new Date(order.updated_on)" type="relative" />
				</n-tag>
			</n-space>
		</template>
	</n-card>
</template>

<script>
import {
	NCard,
	NIcon,
	NH1,
	NText,
	NSwitch,
	NTime,
	NTag,
	NSpace,
	useDialog,
} from 'naive-ui';
import { MdCash } from '@vicons/ionicons4';
import OrdersCOntroller from '@/controllers/OrdersController';

export default {
	components: {
		NCard,
		NTime,
		NIcon,
		NH1,
		NText,
		NTag,
		MdCash,
		NSwitch,
		NSpace,
	},
	props: {
		order: {},
	},
	data() {
		return {
			dialog: useDialog(),
		};
	},
	methods: {
		handleChange(value) {
			let confirmTxt = value ? 'Open ' : 'Close ';

			this.dialog.warning({
				title: 'Confirm',
				content: `${confirmTxt}
				${this.$props.order.type == 0 ? 'buy ' : 'sell '}
				order?`,
				positiveText: `${confirmTxt}`,
				negativeText: 'Cancel',
				onPositiveClick: () => {
					OrdersCOntroller.switchUserOrder(
						this.$store.state.accessToken,
						this.order
					).then((order) => Object.assign(this.order, order));
				},
			});
		},
	},
};
</script>
