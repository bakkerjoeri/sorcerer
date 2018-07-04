import System from './../library/core/module/System';
import gameStateStore from './../library/core/model/gameStateStore';
import {updateComponentOfEntity} from './../library/core/model/entities'

export default class ActionTickerSystem extends System {
	constructor() {
		super(['positionInLevel', 'position'], updatePosition);
	}
}

function updatePosition(entity) {
	let {positionInLevel} = entity.components;

	gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'position', {
		x: positionInLevel.x * 16,
		y: positionInLevel.y * 16,
	}));
}
