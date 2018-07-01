import System from './../library/core/module/System';
import gameStateStore from './../library/core/model/gameStateStore';
import {isKeyPressed} from './../library/core/module/Keyboard';
import {updateComponentOfEntity, removeComponentFromEntity} from './../library/core/model/entities'

export default class ActionTickerSystem extends System {
	constructor() {
		super(['actor', 'canAct'], act);
	}
}

function act(entity) {
	// console.log('Time to act!');
	// gameStateStore.dispatch(removeComponentFromEntity(entity.id, 'canAct'));
	// gameStateStore.dispatch(updateComponentOfEntity(entity.id, 'actionTicker', {
	// 	ticks: 100,
	// }));
}
