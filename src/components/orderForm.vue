<template>
	<div>
		<form>
			<label for="stock_symbol">Stock Symbol</label>
			<select id="stock_symbol" v-model="stockIndex" required>
				<option
					v-for="(stock, index) in stocksList"
					v-bind:key="index"
					:value="index"
				>
					{{ stock.stock_symbol }}
				</option>
			</select>
			<br />
			<label for="type">Type</label>
			<select id="type" v-model="type" required>
				<option v-for="(opt, index) in types" v-bind:key="index" :value="index">
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
			<button v-on:click="newOrder()" type="button">Confirm</button>
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
			stockIndex: null,
			value: 1.0,
			volume: 10,
			types: ['Buy', 'Sell'],
			type: null,
		};
	},
	updated() {
		if (this.type == null && typeof this.$props.stocksList[0] != 'undefined')
			this.stock_symbol = this.$props.stocksList[0].stock_symbol;
	},
	methods: {
		newOrder() {
			if (this.stockIndex == null) return;

			let accessToken = this.$auth.getAccessToken();
			let selectedStock = this.$props.stocksList[this.stockIndex];

			let order = new OrderEntity();
			order.id_user = this.user.id;
			order.id_stock = selectedStock.id;
			order.stock_symbol = selectedStock.stock_symbol;
			order.stock_name = selectedStock.stock_name;
			order.volume = this.volume;
			order.price = this.value;
			order.type = this.type;

			this.controller.newOrder(accessToken, order);
		},
	},
};
</script>
