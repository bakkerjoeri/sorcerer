import gameStateStore from './library/core/model/gameStateStore';
import Game from './library/core/module/Game';
import {createRoom} from './library/core/module/Room';
import {addRoom, addEntityToRoom} from './library/core/model/rooms';
import {setGameName, setCurrentRoomId} from './library/core/model/game';
import {createEntity, createEntityFromBlueprint} from './library/core/module/Entity';
import {addEntity, addComponentToEntity} from './library/core/model/entities';
import ActorEntity from './entity/ActorEntity';
import HealthComponent from './component/HealthComponent';
import SpriteComponent from './component/SpriteComponent';
import loadSprites from './loadSprites';

import AnimationSystem from './library/core/system/AnimationSystem';
import ActionSystem from './system/ActionSystem';
import ActionTickerSystem from './system/ActionTickerSystem';
import PlayerActionSystem from './system/PlayerActionSystem';
import PositionInLevelSystem from './system/PositionInLevelSystem';
import RenderSystem from './library/core/system/RenderSystem';

loadSprites();

gameStateStore.dispatch(setGameName('Sorcerer'));

let room = createRoom({
	size: {
		width: 240,
		height: 176,
	},
});

gameStateStore.dispatch(addRoom(room));
gameStateStore.dispatch(setCurrentRoomId(room.id));

let playerEntity = new ActorEntity({
	name: 'Green Knight',
	player: true,
	health: new HealthComponent({
		maximum: 20,
	}),
	sprite: new SpriteComponent({
		assetId: 'greenknight',
		framesPerSecond: 10,
	}),
	positionInLevel: {
		x: 10,
		y: 10,
	},
});

gameStateStore.dispatch(addEntity(playerEntity));
gameStateStore.dispatch(addEntityToRoom(room.id, playerEntity.id));

let amountOfSlimesToCreate = 10;

while(amountOfSlimesToCreate > 0) {
	let positionInLevel = {
		x: Math.floor(Math.random() * 10),
		y: Math.floor(Math.random() * 10)
	};
	let position = {
		x: positionInLevel.x * 16,
		y: positionInLevel.y * 16,
	}

	let slimeEntity = new ActorEntity({
		nonPlayer: true,
		health: new HealthComponent({
			maximum: 10,
		}),
		sprite: new SpriteComponent({
			assetId: 'slime',
			framesPerSecond: 1,
		}),
		positionInLevel: positionInLevel,
		brain: {},
	});

	gameStateStore.dispatch(addEntity(slimeEntity));
	gameStateStore.dispatch(addEntityToRoom(room.id, slimeEntity.id));

	amountOfSlimesToCreate -= 1;
}

let game = new Game(document.querySelector('.canvas__sorcerer'), 4);

console.log(gameStateStore.getState());

game.addSystem(new PlayerActionSystem());
game.addSystem(new ActionSystem());
game.addSystem(new PositionInLevelSystem());
game.addSystem(new ActionTickerSystem());
game.addSystem(new AnimationSystem());
game.addSystem(new RenderSystem());

game.start();
