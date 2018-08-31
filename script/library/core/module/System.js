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

	handleNotify(topic, gameObjects) {
		if (this.topics.has(topic)) {
			let filteredGameObjects = filterGameObjectsByComponentNames(gameObjects, this.requiredComponents);

			this.topics.get(topic).forEach((callback) => {
				callback(filteredGameObjects, this.game);
			});
		}
	}
}

function filterGameObjectsByComponentNames(gameObjects, componentNames) {
	if (componentNames.length === 0) {
		return gameObjects;
	}

	return gameObjects.filter((gameObject) => {
		return componentNames.every((componentName) => {
			return gameObject.components.hasOwnProperty(componentName);
		})
	});
}
