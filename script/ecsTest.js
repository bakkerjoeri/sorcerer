import gameStateStore from './library/core/model/gameStateStore';
import Game from './library/core/module/Game';
import System from './library/core/module/System';
import RenderSystem from './library/core/system/Render';
import {createEntity} from './library/core/module/Entity';
import {createComponent} from './library/core/module/Component';
import {addEntity, addComponentToEntity, updateComponentOfEntity, removeComponentFromEntity, getComponentValueForEntity} from './library/core/model/entities';

let playerEntity = createEntity();
gameStateStore.dispatch(addEntity(playerEntity));
gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'health', {
	current: 20, maximum: 20
}));

gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'sprite', {
	source: '/assets/images/greenknight.png',
	size: {
		width: 16,
		height: 16,
	},
	currentFrameIndex: 0,
	framesPerSecond: 10,
	isAnimationPaused: false,
	isAnimationLooping: true,
}));

gameStateStore.dispatch(addComponentToEntity(playerEntity.id, 'position', {x: 16, y: 16}));

let game = new Game(document.querySelector('.canvas__sorcerer'), 4);

game.addSystem(new RenderSystem());

game.start();
