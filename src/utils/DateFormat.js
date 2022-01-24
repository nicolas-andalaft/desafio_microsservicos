export default class DateFormat {
	static format(dateString, locale) {
		let date = new Date(dateString);

		return date.toLocaleString(locale ?? 'en_US', {
			dateStyle: 'short',
			timeStyle: 'medium',
		});
	}
}
