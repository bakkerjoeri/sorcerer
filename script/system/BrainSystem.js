import System from './../library/core/module/System.js';
import choose from './../utility/random/choose.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';

export default class BrainSystem extends System {
	constructor() {
		super(entity => doesGameObjectHaveComponents(entity, ['actor', 'nonPlayer', 'canAct', 'positionInLevel']));

		this.decideAction = this.decideAction.bind(this);

		this.observe('update', gameObjects => {
			gameObjects.forEach(this.decideAction);
		});
	}

	decideAction(gameObject) {
		let {isDead, positionInLevel} = gameObject.components;

		if (isDead) {
			this.game.notify('actWait', [gameObject]);
		} else {
			let newPositionInLevel = choose([
				{x: positionInLevel.x, y: positionInLevel.y - 1},
				{x: positionInLevel.x + 1, y: positionInLevel.y},
				{x: positionInLevel.x, y: positionInLevel.y + 1},
				{x: positionInLevel.x - 1, y: positionInLevel.y},
			]);

			this.game.notify('actTowardsPosition', [gameObject], newPositionInLevel);
		}
	}
}
