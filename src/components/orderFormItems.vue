<template>
	<n-form :model="model" :rules="rules" ref="formRef">
		<n-form-item label="Stock" path="id">
			<n-select
				placeholder="Choose stock"
				:options="stocksList"
				v-model:value="model.id"
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
				class="w-100"
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
				class="w-100"
			>
			</n-input-number>
		</n-form-item>

		<n-h1 class="center vertical">
			<p class="small-txt">total</p>
			U$ {{ (model.volume * model.price).toFixed(2) }}
		</n-h1>

		<n-button @click="validate" type="primary" size="large" class="w-100">
			Confirm
		</n-button>
	</n-form>
</template>

<script>
import { ref, h } from 'vue';
import {
	NForm,
	NFormItem,
	NInputNumber,
	NSelect,
	NButton,
	NH1,
	NTag,
} from 'naive-ui';

export default {
	components: {
		NForm,
		NFormItem,
		NInputNumber,
		NSelect,
		NButton,
		NH1,
	},
	props: {
		onValid: Function,
	},
	data() {
		return {
			stocksList: [],
		};
	},
	setup(props) {
		const formRef = ref(null);
		const formModel = ref({
			stock_id: null,
			price: null,
			volume: null,
		});

		const validate = function (e) {
			e.preventDefault();
			formRef.value
				.validate(async function (errors) {
					if (errors) return;

					let order = {};

					order.id_stock = formRef.value.model.id;
					order.volume = formRef.value.model.volume;
					order.price = formRef.value.model.price;

					if (props.onValid) props.onValid(order);
				})
				.catch(() => {});
		};

		const renderStockTitle = ({ option }) => {
			return h(NTag, {}, { default: () => option.label });
		};

		return {
			validate,
			formRef,
			model: formModel,
			renderStockTitle,
			rules: {
				id: {
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
		};
	},
	methods: {
		updateStocks(stocks) {
			if (stocks.length < 1) return;
			this.stocksList = stocks.map((stock) => {
				return {
					label: stock.stock_name + ' - ' + stock.stock_symbol,
					value: stock.id,
				};
			});
		},
		setDefaultStock(stock) {
			this.model = stock;
			console.log(
				'🚀 ~ file: orderFormItems.vue ~ line 142 ~ setDefaultStock ~ this.model',
				this.model
			);
		},
	},
};
</script>
