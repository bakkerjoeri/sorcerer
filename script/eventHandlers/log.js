const logElement = document.querySelector('.js-log')

export const log = (state, message) => {
	let messageElement = document.createElement('li');
	messageElement.classList.add('log__item');
	messageElement.innerHTML = message;
	logElement.appendChild(messageElement);

	return state;
}
