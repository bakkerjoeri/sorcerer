import {getEntitiesWithComponentNames} from './../model/entities';
import {getComponentsForEntityWithId} from './Component';
import gameStateStore from './../model/gameStateStore';

export default class System {
	constructor(requiredComponents = [], updateCallback = () => {}) {
		this.requiredComponents = requiredComponents;

		if (typeof updateCallback !== 'function') {
			throw new Error(`Expected updateCallback to be of type 'function', but got '${typeof updateCallback}'.`)
		}

		this.updateCallback = updateCallback;
	}

	getEligibleComponents() {
		return getEntitiesWithComponentNames(gameStateStore.getState(), this.requiredComponents);
	}

	update() {
		this.getEligibleComponents().forEach((entity) => {
			this.updateCallback(entity, this.game);
		});
	}
}
