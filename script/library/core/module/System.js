import store from './../model/gameStateStore.js';
import {getGameObjectsInCurrentRoom} from './../model/gameObjects.js';
import {doesGameObjectHaveComponents} from './../module/GameObject.js';

export default class System {
	constructor() {
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

	findGameObjects(requiredComponentNames = []) {
		let gameObjects = getGameObjectsInCurrentRoom(store.getState());

		return gameObjects.filter((gameObject) => {
			return doesGameObjectHaveComponents(gameObject, requiredComponentNames);
		});
	}
}
