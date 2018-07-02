import System from './../library/core/module/System';
import gameStateStore from './../library/core/model/gameStateStore';
import {isKeyPressed} from './../library/core/module/Keyboard';
import {getEntitiesWithComponentNames} from './../library/core/model/entities';
import {updateComponentOfEntity, getComponentValueForEntity} from './../library/core/model/entities'

export default class ActionTickerSystem extends System {
	constructor() {
		super(['actor', 'actionTicker']);
	}

	updateAllEntities(entities) {
		// loop through all entities, reducing each' tick by 1.
		// when an entity reaches tick 0, stop looping and assign it `canAct`

		while (getEntitiesWithComponentNames(gameStateStore.getState(), ['canAct']).length === 0) {
			for (let entity of entities) {
				let actionTicker = getComponentValueForEntity(gameStateStore.getState(), entity.id, 'actionTicker');

				if (actionTicker.ticks === 0) {
					gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'canAct', true));
				} else {
					gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'actionTicker', {
						ticks: actionTicker.ticks - 1,
					}));
				}
			}
		}

		super.updateAllEntities(entities);
	}
}
