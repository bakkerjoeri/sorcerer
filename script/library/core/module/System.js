import {getEntitiesWithComponentNames} from './../model/entities';
import {getComponentsForEntityWithId} from './Component';
import gameStateStore from './../model/gameStateStore';

export default class System {
	constructor(requiredComponents = [], updateCallback) {
		this.requiredComponents = requiredComponents;
		this.updateCallback = updateCallback;
	}

	getEligibleComponents() {
		return getEntitiesWithComponentNames(gameStateStore.getState(), this.requiredComponents);
	}

	update() {
		this.getEligibleComponents().forEach((entity) => {
			this.updateCallback(entity);
		});
	}
}
