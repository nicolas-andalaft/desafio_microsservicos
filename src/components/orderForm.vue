<template>
	<div>
		<n-form :model="model" :rules="rules" ref="formRef">
			<n-form-item label="Stock" path="stock_id">
				<n-select
					placeholder="Type the desired stock"
					:options="symbolsList"
					v-model:value="model.stock_id"
					filterable
				>
				</n-select>
			</n-form-item>

			<n-form-item label="Value" path="price">
				<n-input-number
					:min="0.01"
					:step="0.01"
					id="value"
					v-model:value="model.price"
				>
					<template #prefix>$</template>
				</n-input-number>
			</n-form-item>

			<n-form-item label="Volume" path="volume">
				<n-input-number
					:min="1"
					:step="10"
					id="volume"
					v-model:value="model.volume"
				>
				</n-input-number>
			</n-form-item>

			<p>{{ model.volume * model.price }}</p>
			<n-button @click="validate" :loading="loading" type="primary" size="large"
				>Buy</n-button
			>
		</n-form>
	</div>
</template>

<script>
import { ref } from 'vue';
import { NForm, NFormItem, NInputNumber, NSelect, NButton } from 'naive-ui';
import OrdersController from '@/controllers/OrdersController';

export default {
	components: {
		NForm,
		NFormItem,
		NInputNumber,
		NSelect,
		NButton,
	},
	props: {
		user: null,
		stocksList: null,
	},
	data: function () {
		return {
			symbolsList: [],
			loading: false,
		};
	},
	setup(props) {
		const formRef = ref(null);
		const formModel = ref({
			stock_id: null,
			price: null,
			volume: null,
		});
		return {
			formRef,
			model: formModel,
			rules: {
				stock_id: {
					required: true,
					message: 'Enter a valid stock',
				},
				price: {
					required: true,
					message: 'Enter a price value',
				},
				volume: {
					validator(rule, value) {
						if (!value) return new Error('Enter a volume value');
						if (!Number.isInteger(value))
							return new Error('Volume must be a integer number');
					},
				},
			},
			validate(e) {
				e.preventDefault();
				formRef.value
					.validate((errors) => {
						if (errors) return;

						let accessToken = formRef.value.$data.authState.accessToken;
						let order = {};

						order.id_user = props.user.id;
						order.id_stock = formRef.value.model.stock_id;
						order.volume = formRef.value.model.volume;
						order.price = formRef.value.model.price;
						order.type = 0;
						OrdersController.newOrder(accessToken, order);
					})
					.catch(() => {});
			},
		};
	},
	updated() {
		if (this.symbolsList.length == 0 && this.$props.stocksList.length > 0) {
			this.stock_symbol = this.$props.stocksList[0].stock_symbol;
			this.symbolsList = this.$props.stocksList.map((stock) => {
				return {
					label: stock.stock_name + ' - ' + stock.stock_symbol,
					value: stock.id,
				};
			});
		}
	},
};
</script>
