import System from './../library/core/module/System';
import {isKeyPressed} from './../library/core/module/Keyboard';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject';

let waitingToConclude = false;
let hasPressedSpace = false;
let hasMovedUp = false;
let hasMovedRight = false;
let hasMovedDown = false;
let hasMovedLeft = false;

export default class PlayerControlSystem extends System {
	constructor() {
		super(entity => doesGameObjectHaveComponents(entity, ['actor', 'player', 'canAct', 'positionInLevel']));

		this.attemptAction = this.attemptAction.bind(this);

		this.observe('update', (gameObjects) => {
			gameObjects.forEach(this.attemptAction);
		});
	}

	attemptAction(gameObject) {
		let {isDead, positionInLevel} = gameObject.components;

		if (isDead && !waitingToConclude) {
			waitingToConclude = true;

			window.setTimeout(() => {
				this.game.notify('actWait', [gameObject]);
				waitingToConclude = false;
			}, 1000);

			return;
		}

		if (!isDead) {
			if (isKeyPressed(' ') && !hasPressedSpace) {
				hasPressedSpace = true;
				this.game.notify('actWait', [gameObject]);
			} else if (!isKeyPressed(' ') && hasPressedSpace) {
				hasPressedSpace = false;
			}

			if (isKeyPressed('ArrowUp') && !hasMovedUp) {
				hasMovedUp = true;

				this.game.notify('actTowardsPosition', [gameObject], {
					x: positionInLevel.x,
					y: positionInLevel.y - 1,
				});
			} else if (!isKeyPressed('ArrowUp') && hasMovedUp) {
				hasMovedUp = false;
			}

			if (isKeyPressed('ArrowRight') && !hasMovedRight) {
				hasMovedRight = true;

				this.game.notify('actTowardsPosition', [gameObject], {
					x: positionInLevel.x + 1,
					y: positionInLevel.y,
				});
			} else if (!isKeyPressed('ArrowRight') && hasMovedRight) {
				hasMovedRight = false;
			}

			if (isKeyPressed('ArrowDown') && !hasMovedDown) {
				hasMovedDown = true;

				this.game.notify('actTowardsPosition', [gameObject], {
					x: positionInLevel.x,
					y: positionInLevel.y + 1,
				});
			} else if (!isKeyPressed('ArrowDown') && hasMovedDown) {
				hasMovedDown = false;
			}

			if (isKeyPressed('ArrowLeft') && !hasMovedLeft) {
				hasMovedLeft = true;

				this.game.notify('actTowardsPosition', [gameObject], {
					x: positionInLevel.x - 1,
					y: positionInLevel.y,
				});
			} else if (!isKeyPressed('ArrowLeft') && hasMovedLeft) {
				hasMovedLeft = false;
			}
		}
	}
}
