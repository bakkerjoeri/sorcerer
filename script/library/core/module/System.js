export default class System {
	constructor(entityFilter = entity => entity) {
		this.entityFilter = entityFilter;
		this.topics = new Map();
	}

	onEvent(topic, callback) {
		if (typeof callback !== 'function') {
			throw new Error(`Expected callback to be of type 'function', but got '${typeof callback}'.`)
		}

		if (!this.topics.has(topic)) {
			this.topics.set(topic, []);
		}

		this.topics.get(topic).push(callback);
	}

	handleEvent(eventName, gameObjects, ...args) {
		if (this.topics.has(eventName)) {
			let filteredGameObjects = gameObjects.filter(this.entityFilter);

			this.topics.get(eventName).forEach((callback) => {
				callback(filteredGameObjects, ...args);
			});
		}
	}
}
