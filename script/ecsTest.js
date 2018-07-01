import gameStateStore from './library/core/model/gameStateStore';
import Game from './library/core/module/Game';
import {createEntity} from './library/core/module/Entity';
import {addEntity, addComponentToEntity} from './library/core/model/entities';
import loadSprites from './loadSprites';

import RenderSystem from './library/core/system/RenderSystem';
import AnimationSystem from './library/core/system/AnimationSystem';
import PlayerActionSystem from './system/PlayerActionSystem';
import ActionTickerSystem from './system/ActionTickerSystem';
import ActionSystem from './system/ActionSystem';

loadSprites();

let playerEntity = createEntity();
gameStateStore.dispatch(addEntity(playerEntity));
gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'health', {
	current: 20, maximum: 20.
}));

gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'actionTicker', {
	ticks: 100,
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

let game = new Game(document.querySelector('.canvas__sorcerer'), 4);

// game.addSystem(new AnimationSystem());
game.addSystem(new RenderSystem());
game.addSystem(new PlayerActionSystem());
game.addSystem(new ActionSystem());
game.addSystem(new ActionTickerSystem());

game.start();
