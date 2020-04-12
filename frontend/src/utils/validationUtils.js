module.exports = {
	filteringValidationArray(fieldName, validationErrors) {
		return validationErrors.validation.keys.filter(field => field === fieldName)[0];
	},
	getCurrentValidationMessage(fieldName, message, validationErrors) {
		const messageArray = message.split('. ');
		const currentIndex = validationErrors.validation.keys.indexOf(fieldName);

		return messageArray[currentIndex];
	}
}
