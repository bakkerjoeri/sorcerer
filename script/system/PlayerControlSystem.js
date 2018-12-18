import System from './../library/core/module/System.js';
import {findGameObjects} from './../library/core/module/GameObject.js';

export default class PlayerControlSystem extends System {
	constructor(game) {
		super(game);

		this.attemptAction = this.attemptAction.bind(this);

		this.onEvent('keydown', key => {
			findGameObjects(['actor', 'player', 'canAct', 'positionInLevel']).filter((gameObject) => {
				return !gameObject.components.isDead;
			}).forEach((gameObject) => {
				this.attemptAction(gameObject, key)
			});
		});
	}

	attemptAction(gameObject, key) {
		let {positionInLevel} = gameObject.components;

		if (key === ' ') {
			this.game.emitEventViaSystems('actPickUp', gameObject);
		}

		if (key === 'q') {
			this.game.emitEventViaSystems('actWait', gameObject);
		}

		if (key === 'w') {
			this.game.emitEventViaSystems('actTowardsPosition', gameObject, {
				x: positionInLevel.x,
				y: positionInLevel.y - 1,
			});
		}

		if (key === 'd') {
			this.game.emitEventViaSystems('actTowardsPosition', gameObject, {
				x: positionInLevel.x + 1,
				y: positionInLevel.y,
			});
		}

		if (key === 's') {
			this.game.emitEventViaSystems('actTowardsPosition', gameObject, {
				x: positionInLevel.x,
				y: positionInLevel.y + 1,
			});
		}

		if (key === 'a') {
			this.game.emitEventViaSystems('actTowardsPosition', gameObject, {
				x: positionInLevel.x - 1,
				y: positionInLevel.y,
			});
		}
	}
}
