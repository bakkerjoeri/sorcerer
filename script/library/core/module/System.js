import store from './../model/gameStateStore.js';
import {getGameObjectsInCurrentRoom} from './../model/gameObjects.js';
import {doesGameObjectHaveComponents} from './../module/GameObject.js';

export default class System {
	constructor(entityFilter = entity => entity) {
		this.entityFilter = entityFilter;
		this.eventHandlers = new Map();
	}

	onEvent(topic, callback) {
		if (typeof callback !== 'function') {
			throw new Error(`Expected callback to be of type 'function', but got '${typeof callback}'.`)
		}

		if (!this.eventHandlers.has(topic)) {
			this.eventHandlers.set(topic, []);
		}

		this.eventHandlers.get(topic).push(callback);
	}

	handleEvent(eventName, gameObjects, ...args) {
		if (this.eventHandlers.has(eventName)) {
			let filteredGameObjects = gameObjects.filter(this.entityFilter);

			this.eventHandlers.get(eventName).forEach((callback) => {
				callback(filteredGameObjects, ...args);
			});
		}
	}

	findGameObjects(requiredComponentNames = []) {
		let gameObjects = getGameObjectsInCurrentRoom(store.getState());

		return gameObjects.filter((gameObject) => {
			return doesGameObjectHaveComponents(gameObject, requiredComponentNames);
		});
	}
}
