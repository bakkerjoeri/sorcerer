import gameStateStore from './../model/gameStateStore';

export default class System {
	constructor(requiredComponents = [], updateCallback = () => {}) {
		this.requiredComponents = requiredComponents;

		if (typeof updateCallback !== 'function') {
			throw new Error(`Expected updateCallback to be of type 'function', but got '${typeof updateCallback}'.`)
		}

		this.updateCallback = updateCallback;
	}

	update(entities) {
		filterEntitiesByComponentNames(entities, this.requiredComponents).forEach((entity) => {
			this.updateCallback(entity, this.game);
		});
	}
}

function filterEntitiesByComponentNames(entities, componentNames) {
	if (componentNames.length === 0) {
		return entities;
	}

	return entities.filter((entity) => {
		return componentNames.every((componentName) => {
			return entity.components.hasOwnProperty(componentName);
		})
	});
}
