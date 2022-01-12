<template>
	<div class="home">
		<div v-if="this.$root.authenticated">
			<p v-if="claims.name">Welcome, {{ claims.name }}!</p>
			<br />
			<table>
				<thead>
					<th>Name</th>
					<th>Last Updated</th>
					<th>Created ON</th>
					<th>Ativo</th>
					<th>Ask Min</th>
					<th>Bid Min</th>
					<th>Bid Max</th>
				</thead>
				<tbody>
					<tr v-for="(entry, index) in stocksData" :key="index">
						<td>{{ entry.stock_name }}</td>
						<td>{{ formatDate(entry.updated_on) }}</td>
						<td>{{ formatDate(entry.created_on) }}</td>
						<td>{{ entry.stock_symbol }}</td>
						<td>{{ entry.ask_min }}</td>
						<td>{{ entry.bid_min }}</td>
						<td>{{ entry.bid_max }}</td>
					</tr>
					<!-- <tr>
						<td>{{ typeof stocksData }}</td>
					</tr> -->
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Home',
	data: function () {
		return {
			userLocale: '',
			claims: '',
			stocksData: [],
		};
	},
	created() {
		this.setup();
	},
	methods: {
		async setup() {
			this.userLocale = navigator.languages[0] ?? 'en-US';

			if (this.$root.authenticated) {
				this.claims = await this.$auth.getUser();
				let accessToken = this.$auth.getAccessToken();

				try {
					let response = await axios.get('http://localhost:8082/stocks', {
						headers: { Authorization: 'Bearer ' + accessToken },
					});
					this.stocksData = response.data;
				} catch (error) {
					this.stocksData = `${error}`;
				}
			}
		},
		formatDate(dateString) {
			let date = new Date(dateString);
			return date.toLocaleString(this.userLocale, {
				dateStyle: 'short',
				timeStyle: 'medium',
			});
		},
	},
};
</script>
