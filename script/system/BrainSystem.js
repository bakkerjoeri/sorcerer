import System from './../library/core/module/System.js';
import choose from './../utility/random/choose.js';
import {findGameObjects} from './../library/core/module/GameObject.js';

export default class BrainSystem extends System {
	constructor(game) {
		super(game);

		this.decideAction = this.decideAction.bind(this);

		this.onEvent('update', () => {
			findGameObjects(['actor', 'nonPlayer', 'canAct', 'positionInLevel']).forEach(this.decideAction)
		});
	}

	decideAction(gameObject) {
		let {isDead, positionInLevel} = gameObject.components;

		if (isDead) {
			this.game.emitEventViaSystems('actWait', gameObject);
		} else {
			let newPositionInLevel = choose([
				{x: positionInLevel.x, y: positionInLevel.y - 1},
				{x: positionInLevel.x + 1, y: positionInLevel.y},
				{x: positionInLevel.x, y: positionInLevel.y + 1},
				{x: positionInLevel.x - 1, y: positionInLevel.y},
			]);

			this.game.emitEventViaSystems('actTowardsPosition', gameObject, newPositionInLevel);
		}
	}
}
