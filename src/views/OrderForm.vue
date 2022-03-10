<template>
	<div class="center">
		<n-card
			:title="'Create ' + (type == 0 ? 'Buy' : 'Sell') + ' Order'"
			@close="routeBack"
			class="small-form"
			closable
		>
			<order-form-items :onValid="onValid" ref="formItems" />
		</n-card>
	</div>
</template>

<script>
import { NCard, useDialog } from 'naive-ui';
import OrderFormItems from '@/components/orderFormItems';
import OrdersController from '@/controllers/OrdersController';
import StocksController from '@/controllers/StocksController';
import router from '@/router/index';

export default {
	components: {
		OrderFormItems,
		NCard,
	},
	data() {
		return {
			accessToken: '',
			dialog: useDialog(),
			type: '',
		};
	},
	mounted() {
		this.accessToken = this.$store.state.accessToken;
		this.type = this.$route.params.type ?? 0;
		let user = this.$store.state.user;

		let id_stock = this.$route.params.id_stock;
		if (id_stock) {
			StocksController.getStock(this.accessToken, id_stock).then(
				this.$refs.formItems.setDefaultStock
			);
		}

		if (this.type == 0) {
			StocksController.getStocks(this.accessToken).then(
				this.$refs.formItems.updateStocks
			);
		} else {
			OrdersController.getUserStocksBalance(this.accessToken, user).then(
				this.$refs.formItems.updateStocks
			);
		}
	},
	methods: {
		routeBack() {
			router.go(-1);
		},
		async onValid(order) {
			order.id_user = this.$store.state.user.id;
			order.type = this.type;

			await OrdersController.newOrder(this.accessToken, order);

			this.dialog.success({
				title: 'Sucess',
				content: 'Your order has been created ',
				positiveText: 'Return',
				onPositiveClick: () => router.push('/profile'),
			});
		},
	},
};
</script>
