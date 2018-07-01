import System from './../library/core/module/System';
import gameStateStore from './../library/core/model/gameStateStore';
import {isKeyPressed} from './../library/core/module/Keyboard';
import {updateComponentOfEntity, removeComponentFromEntity} from './../library/core/model/entities'

export default class PlayerControlSystem extends System {
	constructor() {
		super(['actor', 'player', 'canAct', 'position'], act);
	}
}

let hasMovedUp = false;
let hasMovedRight = false;
let hasMovedDown = false;
let hasMovedLeft = false;

function act(entity) {
	let {position} = entity.components;

	if (isKeyPressed('ArrowUp') && !hasMovedUp) {
		hasMovedUp = true;

		gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'position', {
			x: position.x,
			y: position.y - 16,
		}));

		concludeAction(entity);
	} else if (!isKeyPressed('ArrowUp') && hasMovedUp) {
		hasMovedUp = false;
	}

	if (isKeyPressed('ArrowRight') && !hasMovedRight) {
		hasMovedRight = true;

		gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'position', {
			x: position.x + 16,
			y: position.y,
		}));

		concludeAction(entity);
	} else if (!isKeyPressed('ArrowRight') && hasMovedRight) {
		hasMovedRight = false;
	}

	if (isKeyPressed('ArrowDown') && !hasMovedDown) {
		hasMovedDown = true;

		gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'position', {
			x: position.x,
			y: position.y + 16,
		}));

		concludeAction(entity);
	} else if (!isKeyPressed('ArrowDown') && hasMovedDown) {
		hasMovedDown = false;
	}

	if (isKeyPressed('ArrowLeft') && !hasMovedLeft) {
		hasMovedLeft = true;

		gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'position', {
			x: position.x - 16,
			y: position.y,
		}));

		concludeAction(entity);
	} else if (!isKeyPressed('ArrowLeft') && hasMovedLeft) {
		hasMovedLeft = false;
	}
}

function concludeAction(entity) {
	gameStateStore.dispatch(removeComponentFromEntity(entity.id, 'canAct'));
	gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'actionTicker', {
		ticks: 100,
	}));
}
