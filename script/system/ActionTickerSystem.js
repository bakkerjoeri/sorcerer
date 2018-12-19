import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {getGameObjectsWithComponentNames, updateComponentOfGameObject} from './../library/core/model/gameObjects.js';
import {findGameObjects} from './../library/core/module/GameObject.js';

export default class ActionTickerSystem extends System {
	constructor() {
		super();

		this.onEvent('update', () => {
			let gameObjectsToUpdate = findGameObjects(['actor', 'actionTicker']).filter((gameObject) => {
				return !gameObject.components.isDead;
			});

			updateActionTicks(gameObjectsToUpdate);
		});
	}
}

function updateActionTicks(gameObjects) {
	// Action ticks should only be reduced while no actor is ready to act.
	if (getGameObjectsWithComponentNames(store.getState(), ['canAct']).length === 0) {
		// First we determine the lowest amount of ticks until the next action.
		let ticksUntilNextTurn = gameObjects.reduce((lowestTicksFound, gameObject) => {
			if (gameObject.components.actionTicker.ticks < lowestTicksFound) {
				return gameObject.components.actionTicker.ticks;
			}

			return lowestTicksFound;
		}, Infinity);

		// Then we reduce each actor's ticker with the lowest amount of ticks
		// necessary to get ready for the next action. Any actor who's ticks are
		// now at 0 gets a flag that it is ready to act.
		gameObjects.forEach((gameObject) => {
			let newTicks = gameObject.components.actionTicker.ticks - ticksUntilNextTurn;

			store.dispatch(updateComponentOfGameObject(gameObject.id, 'actionTicker', {
				ticks: newTicks,
			}));

			if (newTicks === 0) {
				store.dispatch(updateComponentOfGameObject(gameObject.id, 'canAct', true));
			}
		});
	}
}
