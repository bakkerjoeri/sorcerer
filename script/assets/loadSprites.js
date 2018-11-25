import {loadSpriteFrames} from './../library/core/module/SpriteFrame.js';
import {createSprite} from './../library/core/module/Sprite.js';

export default function loadSprites() {
	spriteIndex.forEach((spriteData) => {
		loadSpriteFrames(spriteData.name, spriteData.filepath, spriteData.frameSize, spriteData.frameStart, spriteData.frameOffset);
		createSprite({
			id: spriteData.name,
			spriteFrames: spriteData.frames.map((frameId) => `${spriteData.name}_${frameId}`),
		});
	});
}


export const spriteIndex = [
	{
		name: 'greenknight',
		filepath: '/assets/images/greenknight.png',
		frameSize: {
			width: 16,
			height: 16,
		},
		frameStart: 0,
		frameOffset: 6,
		frames: [0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 4, 5],
	},
	{
		name: 'slime',
		filepath: '/assets/images/slime.png',
		frameSize: {
			width: 16,
			height: 16,
		},
		frameStart: 0,
		frameOffset: 2,
		frames: [0, 1],
	},
	{
		name: 'giantslime',
		filepath: '/assets/images/giantslime.png',
		frameSize: {
			width: 32,
			height: 32,
		},
		frameStart: 0,
		frameOffset: 2,
		frames: [0, 1],
	},
	{
		name: 'wall',
		filepath: '/assets/images/giantslime.png',
		frameSize: {
			width: 16,
			height: 16,
		},
		frameStart: 0,
		frameOffset: 1,
		frames: [0],
	},
	{
		name: 'grave',
		filepath: '/assets/images/grave.png',
		frameSize: {
			width: 16,
			height: 16,
		},
		frameStart: 0,
		frameOffset: 1,
		frames: [0],
	},
	{
		name: 'rustydagger',
		filepath: '/assets/images/rustydagger.png',
		frameSize: {
			width: 16,
			height: 16,
		},
		frameStart: 0,
		frameOffset: 1,
		frames: [0],
	},
]
