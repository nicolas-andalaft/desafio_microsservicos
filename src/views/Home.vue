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
					<th>Symbol</th>
					<th>Ask Min</th>
					<th>Bid Min</th>
					<th>Bid Max</th>
				</thead>
				<tbody>
					<tr v-for="(entry, index) in stocksData" :key="index">
						<td>{{ entry.stock_name }}</td>
						<td>{{ entry.updated_on }}</td>
						<td>{{ entry.created_on }}</td>
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
			claims: '',
			stocksData: [],
		};
	},
	created() {
		this.setup();
	},
	methods: {
		async setup() {
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
	},
};
</script>
