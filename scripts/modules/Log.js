const logElement = document.querySelector('.js-log')

export default class Log {
	static showMessage(message) {
		let messageElement = document.createElement('li');
		messageElement.classList.add('log__item');
		messageElement.innerHTML = message;
		logElement.appendChild(messageElement);
	}
}
