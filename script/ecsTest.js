import gameStateStore from './library/core/model/gameStateStore';
import loadSprites from './loadSprites';
import Game from './library/core/module/Game';
import RenderSystem from './library/core/system/RenderSystem';
import AnimationSystem from './library/core/system/AnimationSystem';
import {createEntity} from './library/core/module/Entity';
import {addEntity, addComponentToEntity} from './library/core/model/entities';

loadSprites();

let playerEntity = createEntity();
gameStateStore.dispatch(addEntity(playerEntity));
gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'health', {
	current: 20, maximum: 20.
}));

gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'sprite', {
	assetId: 'greenknight',
	currentFrameIndex: 0,
	framesPerSecond: 10,
	isAnimationPaused: false,
	isAnimationLooping: true,
}));

gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'position', {x: 16, y: 16}));

let game = new Game(document.querySelector('.canvas__sorcerer'), 4);

game.addSystem(new AnimationSystem());
game.addSystem(new RenderSystem());

game.start();
