import System from './../module/System';
import gameStateStore from './../model/gameStateStore';
import {getCurrentRoom} from './../model/rooms';
import {getSpriteWithId} from './../model/sprites';
import {getSpriteFrameWithId} from './../model/spriteFrames';
import {getImageFromFilePath} from './../module/SpriteFrame';

export default class RenderSystem extends System {
	constructor() {
		super(['sprite', 'position'], renderGameObject);
	}

	update(gameObjects) {
		clearCanvasContext(this.game.canvas, this.game.context);
		drawCurrentRoomBackground(this.game.context);

		super.update(gameObjects);
	}
}

function clearCanvasContext(canvas, context) {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCurrentRoomBackground(context) {
	let currentRoom = getCurrentRoom(gameStateStore.getState());

	context.fillStyle = currentRoom.backgroundColor;
	context.fillRect(
		0,
		0,
		currentRoom.size.width,
		currentRoom.size.height,
	);
}

function renderGameObject(gameObject, game) {
	let {sprite, position} = gameObject.components;

	let spriteAsset = getSpriteWithId(gameStateStore.getState(), sprite.assetId);
	let currentSpriteFrame = getSpriteFrameWithId(gameStateStore.getState(), spriteAsset.spriteFrames[sprite.currentFrameIndex]);

	game.context.drawImage(
		getImageFromFilePath(currentSpriteFrame.imageFilePath),
		currentSpriteFrame.origin.x, currentSpriteFrame.origin.y,
		currentSpriteFrame.size.width, currentSpriteFrame.size.height,
		position.x, position.y,
		currentSpriteFrame.size.width, currentSpriteFrame.size.height
	);
}