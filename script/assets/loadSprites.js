import {loadSpriteFrames} from './../library/core/module/SpriteFrame.js';
import {createSprite} from './../library/core/module/Sprite.js';

export default function loadSprites() {
	loadGreenKnightSprite();
	loadSlimeSprite();
	loadGiantSlimeSprite();
	loadWallSprite();
	loadGraveSprite();
}

function loadGreenKnightSprite() {
	loadSpriteFrames('greenknight', '/assets/images/greenknight.png', {
		width: 16,
		height: 16,
	}, 0, 6);

	createSprite({
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
}

function loadSlimeSprite() {
	loadSpriteFrames('slime', '/assets/images/slime.png', {
		width: 16,
		height: 16,
	}, 0, 2);

	createSprite({
		id: 'slime',
		spriteFrames: [
			'slime_0',
			'slime_1',
		],
	});
}

function loadGiantSlimeSprite() {
	loadSpriteFrames('giantslime', '/assets/images/giantslime.png', {
		width: 32,
		height: 32,
	}, 0, 2);

	createSprite({
		id: 'giantslime',
		spriteFrames: [
			'giantslime_0',
			'giantslime_1',
		],
	});
}

function loadWallSprite() {
	loadSpriteFrames('wall', '/assets/images/wall.png', {
		width: 16,
		height: 16,
	});

	createSprite({
		id: 'wall',
		spriteFrames: [
			'wall_0',
		],
	});
}

function loadGraveSprite() {
	loadSpriteFrames('grave', '/assets/images/grave.png', {
		width: 16,
		height: 16,
	});

	createSprite({
		id: 'grave',
		spriteFrames: [
			'grave_0',
		],
	});
}
