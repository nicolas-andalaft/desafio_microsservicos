export default class UserEntity {
	id;
	name;
	username;
	dollar_balance;
	created_on;
	updated_on;

	constructor(id, name, username, dollar_balance, created_on, updated_on) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.dollar_balance = dollar_balance;
		this.created_on = created_on;
		this.updated_on = updated_on;
	}
}
