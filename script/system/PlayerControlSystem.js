import System from './../library/core/module/System';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject';

export default class PlayerControlSystem extends System {
	constructor() {
		super(entity => {
			return doesGameObjectHaveComponents(entity, ['actor', 'player', 'canAct', 'positionInLevel'])
				&& !doesGameObjectHaveComponents(entity, ['isDead']);
		});

		this.attemptAction = this.attemptAction.bind(this);

		this.observe('keydown', (gameObjects, key) => {
			gameObjects.forEach((gameObject) => {
				this.attemptAction(gameObject, key)
			});
		});
	}

	attemptAction(gameObject, key) {
		let {positionInLevel} = gameObject.components;

		if (key === ' ') {
			this.game.notify('actWait', [gameObject]);
		}

		if (key === 'ArrowUp') {
			this.game.notify('actTowardsPosition', [gameObject], {
				x: positionInLevel.x,
				y: positionInLevel.y - 1,
			});
		}

		if (key === 'ArrowRight') {
			this.game.notify('actTowardsPosition', [gameObject], {
				x: positionInLevel.x + 1,
				y: positionInLevel.y,
			});
		}

		if (key === 'ArrowDown') {
			this.game.notify('actTowardsPosition', [gameObject], {
				x: positionInLevel.x,
				y: positionInLevel.y + 1,
			});
		}

		if (key === 'ArrowLeft') {
			this.game.notify('actTowardsPosition', [gameObject], {
				x: positionInLevel.x - 1,
				y: positionInLevel.y,
			});
		}
	}
}
