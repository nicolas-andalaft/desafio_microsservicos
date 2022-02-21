<template>
	<div class="center">
		<n-card title="Create Order" @close="routeBack" class="small-form" closable>
			<order-form-items
				:defaultStock="stock"
				:onValid="onValid"
				ref="formItems"
				updateStocks
			/>
		</n-card>
	</div>
</template>

<script>
import { NCard, useDialog } from 'naive-ui';
import OrderFormItems from '@/components/orderFormItems';
import OrdersController from '@/controllers/OrdersController';
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
		};
	},
	async beforeMount() {
		this.accessToken = this.$store.state.accessToken;
		let user = this.$store.state.user;

		let stocksList = await OrdersController.getUserStocksBalance(
			this.accessToken,
			user
		);
		this.$refs.formItems.updateStocks(stocksList);
	},
	methods: {
		routeBack() {
			router.go(-1);
		},
		async onValid(order) {
			order.id_user = this.$store.state.user.id;
			order.type = this.$route.params.type;

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
