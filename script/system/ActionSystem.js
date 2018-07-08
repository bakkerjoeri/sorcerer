import System from './../library/core/module/System';
import gameStateStore from './../library/core/model/gameStateStore';
import choose from './../utility/random/choose';
import {updateComponentOfEntity, removeComponentFromEntity} from './../library/core/model/entities'

export default class ActionTickerSystem extends System {
	constructor() {
		super(['actor', 'nonPlayer', 'canAct', 'positionInLevel'], act);
	}
}

function act(entity) {
	let {positionInLevel} = entity.components;

	let newPositionInLevel = choose([
		{x: positionInLevel.x, y: positionInLevel.y - 1},
		{x: positionInLevel.x + 1, y: positionInLevel.y},
		{x: positionInLevel.x, y: positionInLevel.y + 1},
		{x: positionInLevel.x - 1, y: positionInLevel.y},
	]);

	gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'positionInLevel', newPositionInLevel));
	concludeAction(entity);
}

function concludeAction(entity) {
	gameStateStore.dispatch(removeComponentFromEntity(entity.id, 'canAct'));
	gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'actionTicker', {
		ticks: 100,
	}));
}
