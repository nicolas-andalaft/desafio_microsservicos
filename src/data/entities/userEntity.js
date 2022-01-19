export default class UserEntity {
	constructor(id, name, username, dollarBalance, createdOn, updatedOn) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.dollarBalance = dollarBalance;
		this.createdOn = createdOn;
		this.updatedOn = updatedOn;
	}

	static fromMap(map) {
		return new UserEntity(
			map.id,
			map.name,
			map.username,
			map.dollar_balance,
			map.created_on,
			map.updated_on
		);
	}
}
