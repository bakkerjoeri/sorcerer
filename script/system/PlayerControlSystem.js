import System from './../library/core/module/System.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';

export default class PlayerControlSystem extends System {
	constructor() {
		super(entity => {
			return doesGameObjectHaveComponents(entity, ['actor', 'player', 'canAct', 'positionInLevel'])
				&& !doesGameObjectHaveComponents(entity, ['isDead']);
		});

		this.attemptAction = this.attemptAction.bind(this);

		this.subscribe('keydown', (gameObjects, key) => {
			gameObjects.forEach((gameObject) => {
				this.attemptAction(gameObject, key)
			});
		});
	}

	attemptAction(gameObject, key) {
		let {positionInLevel} = gameObject.components;

		if (key === ' ') {
			this.game.emitEvent('actWait', [gameObject]);
		}

		if (key === 'ArrowUp') {
			this.game.emitEvent('actTowardsPosition', [gameObject], {
				x: positionInLevel.x,
				y: positionInLevel.y - 1,
			});
		}

		if (key === 'ArrowRight') {
			this.game.emitEvent('actTowardsPosition', [gameObject], {
				x: positionInLevel.x + 1,
				y: positionInLevel.y,
			});
		}

		if (key === 'ArrowDown') {
			this.game.emitEvent('actTowardsPosition', [gameObject], {
				x: positionInLevel.x,
				y: positionInLevel.y + 1,
			});
		}

		if (key === 'ArrowLeft') {
			this.game.emitEvent('actTowardsPosition', [gameObject], {
				x: positionInLevel.x - 1,
				y: positionInLevel.y,
			});
		}
	}
}
