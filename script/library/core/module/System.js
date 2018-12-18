export default class System {
	constructor(game) {
		this.game = game;
		this.eventHandlers = new Map();
	}

	onEvent(eventName, callback) {
		if (typeof callback !== 'function') {
			throw new Error(`Expected callback to be of type 'function', but got '${typeof callback}'.`)
		}

		if (!this.eventHandlers.has(eventName)) {
			this.eventHandlers.set(eventName, []);
		}

		this.eventHandlers.get(eventName).push(callback);
	}

	handleEvent(eventName, ...args) {
		if (this.eventHandlers.has(eventName)) {
			this.eventHandlers.get(eventName).forEach((callback) => {
				callback(...args);
			});
		}
	}
}
