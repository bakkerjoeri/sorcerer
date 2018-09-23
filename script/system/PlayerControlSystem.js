import System from './../library/core/module/System';
import {isKeyPressed} from './../library/core/module/Keyboard';

export default class PlayerControlSystem extends System {
	constructor() {
		super(['actor', 'player', 'canAct', 'positionInLevel']);

		this.observe('update', (gameObjects, game) => {
			gameObjects.forEach((gameObject) => {
				attemptAction(gameObject, game);
			});
		});
	}
}

let waitingToConclude = false;
let hasPressedSpace = false;
let hasMovedUp = false;
let hasMovedRight = false;
let hasMovedDown = false;
let hasMovedLeft = false;

function attemptAction(gameObject, game) {
	let {isDead, positionInLevel} = gameObject.components;

	if (isDead && !waitingToConclude) {
		waitingToConclude = true;

		window.setTimeout(() => {
			game.notify('actWait', [gameObject]);
		}, 500);

		return;
	}

	if (isKeyPressed(' ') && !hasPressedSpace) {
		hasPressedSpace = true;
		console.log(`${gameObject.components.name} waits...`);
		game.notify('actWait', [gameObject]);
	} else if (!isKeyPressed(' ') && hasPressedSpace) {
		hasPressedSpace = false;
	}

	if (isKeyPressed('ArrowUp') && !hasMovedUp) {
		hasMovedUp = true;

		game.notify('actTowardsPosition', [gameObject], {
			x: positionInLevel.x,
			y: positionInLevel.y - 1,
		}, game);
	} else if (!isKeyPressed('ArrowUp') && hasMovedUp) {
		hasMovedUp = false;
	}

	if (isKeyPressed('ArrowRight') && !hasMovedRight) {
		hasMovedRight = true;

		game.notify('actTowardsPosition', [gameObject], {
			x: positionInLevel.x + 1,
			y: positionInLevel.y,
		}, game);
	} else if (!isKeyPressed('ArrowRight') && hasMovedRight) {
		hasMovedRight = false;
	}

	if (isKeyPressed('ArrowDown') && !hasMovedDown) {
		hasMovedDown = true;

		game.notify('actTowardsPosition', [gameObject], {
			x: positionInLevel.x,
			y: positionInLevel.y + 1,
		}, game);
	} else if (!isKeyPressed('ArrowDown') && hasMovedDown) {
		hasMovedDown = false;
	}

	if (isKeyPressed('ArrowLeft') && !hasMovedLeft) {
		hasMovedLeft = true;

		game.notify('actTowardsPosition', [gameObject], {
			x: positionInLevel.x - 1,
			y: positionInLevel.y,
		}, game);
	} else if (!isKeyPressed('ArrowLeft') && hasMovedLeft) {
		hasMovedLeft = false;
	}
}
