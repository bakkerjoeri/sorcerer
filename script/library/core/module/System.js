export default class System {
	constructor(requiredComponents = [], updateCallback = () => {}) {
		this.requiredComponents = requiredComponents;

		if (typeof updateCallback !== 'function') {
			throw new Error(`Expected updateCallback to be of type 'function', but got '${typeof updateCallback}'.`)
		}

		this.updateCallback = updateCallback;
	}

	update(gameObjects) {
		this.updateGameObjects(filterGameObjectsByComponentNames(gameObjects, this.requiredComponents));
	}

	updateGameObjects(gameObjects) {
		gameObjects.forEach((gameObject) => {
			this.updateCallback(gameObject, this.game);
		});
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
