import System from './../module/System';
import gameStateStore from './../model/gameStateStore';
import {getSpriteWithId} from './../model/sprites';
import {getSpriteFrameWithId} from './../model/spriteFrames';
import {getImageFromFilePath} from './../module/SpriteFrame';

export default class RenderSystem extends System {
	constructor() {
		super(['sprite', 'position'], renderEntity);
	}

	update(entities) {
		clearCanvasContext(this.game.canvas, this.game.context);

		super.update(entities);
	}
}

function clearCanvasContext(canvas, context) {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function renderEntity(entity, game) {
	let {sprite, position} = entity.components;

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
