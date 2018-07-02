import gameStateStore from './library/core/model/gameStateStore';
import {loadSpriteFrames} from './library/core/module/SpriteFrame';
import {createSprite} from './library/core/module/Sprite';
import {addSprite} from './library/core/model/sprites';

export default function loadSprites() {
	loadGreenKnightSprite();
	loadSlimeSprite();
}

function loadGreenKnightSprite() {
	loadSpriteFrames('greenknight', '/assets/images/greenknight.png', {
		width: 16,
		height: 16,
	}, 0, 6);

	// Create the player sprite
	let playerSprite = createSprite({
		id: 'greenknight',
		spriteFrames: [
			'greenknight_0',
			'greenknight_0',
			'greenknight_0',
			'greenknight_0',
			'greenknight_0',
			'greenknight_1',
			'greenknight_2',
			'greenknight_3',
			'greenknight_3',
			'greenknight_3',
			'greenknight_3',
			'greenknight_4',
			'greenknight_5',
		],
	});
	gameStateStore.dispatch(addSprite(playerSprite));
}

function loadSlimeSprite() {
	loadSpriteFrames('slime', '/assets/images/slime.png', {
		width: 16,
		height: 16,
	}, 0, 2);

	// Create the player sprite
	let playerSprite = createSprite({
		id: 'slime',
		spriteFrames: [
			'slime_0',
			'slime_1',
		],
	});
	gameStateStore.dispatch(addSprite(playerSprite));
}
