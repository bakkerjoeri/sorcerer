import {filterGameObjectsByComponentNames} from './GameObject';

export default class System {
	constructor(requiredComponents = [], updateCallback = () => {}) {
		this.requiredComponents = requiredComponents;
		this.topics = new Map();
	}

	observe(topic, callback) {
		if (typeof callback !== 'function') {
			throw new Error(`Expected callback to be of type 'function', but got '${typeof callback}'.`)
		}

		if (!this.topics.has(topic)) {
			this.topics.set(topic, []);
		}

		this.topics.get(topic).push(callback);
	}

	handleNotify(topic, gameObjects, ...args) {
		if (this.topics.has(topic)) {
			let filteredGameObjects = filterGameObjectsByComponentNames(gameObjects, this.requiredComponents);

			this.topics.get(topic).forEach((callback) => {
				callback(filteredGameObjects, this.game, ...args);
			});
		}
	}
}
