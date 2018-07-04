import gameStateStore from './library/core/model/gameStateStore';
import Game from './library/core/module/Game';
import {createEntity} from './library/core/module/Entity';
import {addEntity, addComponentToEntity} from './library/core/model/entities';
import loadSprites from './loadSprites';

import AnimationSystem from './library/core/system/AnimationSystem';
import ActionSystem from './system/ActionSystem';
import ActionTickerSystem from './system/ActionTickerSystem';
import PlayerActionSystem from './system/PlayerActionSystem';
import PositionInLevelSystem from './system/PositionInLevelSystem';
import RenderSystem from './library/core/system/RenderSystem';

import isPositionFree from './isPositionFree';

loadSprites();

let playerEntity = createEntity();
gameStateStore.dispatch(addEntity(playerEntity));
gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'name', 'Green Knight'));
gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'isSolid', true));
gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'health', {
	current: 20, maximum: 20.
}));

gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'actionTicker', {
	ticks: 0,
}));

gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'sprite', {
	assetId: 'greenknight',
	currentFrameIndex: 0,
	framesPerSecond: 10,
	isAnimationPaused: false,
	isAnimationLooping: true,
}));

gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'player', true));
gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'actor', true));
gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'position', {x: 16, y: 16}));

let amountOfSlimesToCreate = 50;

while(amountOfSlimesToCreate > 0) {
	let position = {x: Math.floor(Math.random() * 20) * 16, y: Math.floor(Math.random() * 20) * 16};

	if (isPositionFree(position)) {
		let slimeEntity = createEntity();
		gameStateStore.dispatch(addEntity(slimeEntity));
		gameStateStore.dispatch(addComponentToEntity(slimeEntity.id, 'name', 'Slime'));
		gameStateStore.dispatch(addComponentToEntity(slimeEntity.id, 'isSolid', true));
		gameStateStore.dispatch(addComponentToEntity(slimeEntity.id, 'health', {
			current: 10, maximum: 10,
		}));

		gameStateStore.dispatch(addComponentToEntity(slimeEntity.id, 'actionTicker', {
			ticks: 0,
		}));

		gameStateStore.dispatch(addComponentToEntity(slimeEntity.id, 'sprite', {
			assetId: 'slime',
			currentFrameIndex: 0,
			framesPerSecond: 1,
			isAnimationPaused: false,
			isAnimationLooping: true,
		}));

		gameStateStore.dispatch(addComponentToEntity(slimeEntity.id, 'actor', true));
		gameStateStore.dispatch(addComponentToEntity(slimeEntity.id, 'brain', {}));
		gameStateStore.dispatch(addComponentToEntity(slimeEntity.id, 'position', position));

		amountOfSlimesToCreate -= 1;
	}
}

let game = new Game(document.querySelector('.canvas__sorcerer'), 4);

game.addSystem(new PlayerActionSystem());
game.addSystem(new ActionSystem());
game.addSystem(new PositionInLevelSystem());
game.addSystem(new ActionTickerSystem());
game.addSystem(new AnimationSystem());
game.addSystem(new RenderSystem());

game.start();
