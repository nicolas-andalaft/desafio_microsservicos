<template>
	<div>
		<form>
			<label for="stock_symbol">Stock Symbol</label>
			<select id="stock_symbol" v-model="stock_symbol" required>
				<option v-for="(stock, index) in stocksList" v-bind:key="index">
					{{ stock.stock_symbol }}
				</option>
			</select>
			<br />
			<label for="type">Type</label>
			<select id="type" required>
				<option v-for="opt in type" v-bind:key="opt">
					{{ opt }}
				</option>
			</select>
			<br />
			<label for="value">Value</label>
			<input
				id="value"
				v-model="value"
				type="number"
				min="0.01"
				step="0.01"
				onkeypress="return /([0-9]|,|.)/.test(event.key)"
				required
			/>
			<br />
			<label for="volume">Volume</label>
			<input
				id="volume"
				v-model="volume"
				type="number"
				min="1"
				onkeypress="return /[0-9]/.test(event.key)"
				required
			/>
			<br />
			<p>{{ volume * value }}</p>
			<button>Confirm</button>
		</form>
	</div>
</template>

<script>
import OrdersController from '../data/controllers/ordersController';
import OrderEntity from '../data/entities/orderEntity';

export default {
	props: {
		user: {
			required: true,
		},
		stocksList: {
			required: true,
		},
	},
	data: function () {
		return {
			controller: new OrdersController(),
			stock_symbol: null,
			value: 1.0,
			volume: 10,
			type: ['Buy', 'Sell'],
		};
	},
	updated() {
		if (
			this.stock_symbol == null &&
			typeof this.$props.stocksList[0] != 'undefined'
		)
			this.stock_symbol = this.$props.stocksList[0].stock_symbol;
	},
	methods: {
		newOrder() {
			let accessToken = this.$auth.getAccessToken();

			let order = new OrderEntity();
			order.id_user = this.user.id;
			order.volume = this.volume;
			order.price = this.price;
			order.type = this.type;

			this.controller.newOrder(accessToken);
		},
	},
};
</script>
