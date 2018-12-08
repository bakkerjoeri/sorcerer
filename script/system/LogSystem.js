import System from './../library/core/module/System.js';

const logElement = document.querySelector('.js-log')

export default class LogSystem extends System {
	constructor() {
		super();

		this.onEvent('log', this.log.bind(this));
	}

	log(message) {
		let messageElement = document.createElement('li');
		messageElement.classList.add('log__item');
		messageElement.innerHTML = message;
		logElement.appendChild(messageElement);
	}
}
