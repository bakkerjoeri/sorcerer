import System from './../module/System';
import {getCurrentRoom} from './../model/rooms';
import {getActiveViewportsInRoomWithId} from './../model/viewports';
import {getSpriteWithId} from './../model/sprites';
import {getSpriteFrameWithId} from './../model/spriteFrames';
import {getImageFromFilePath} from './../module/SpriteFrame';

export default class RenderSystem extends System {
	constructor() {
		super(['sprite', 'position']);

		this.observe('draw', drawFrame);
	}
}

function drawFrame(gameObjects, game) {
	let viewports = getActiveViewportsInRoomWithId(getCurrentRoom().id);

	viewports.forEach((viewport) => {
		drawFrameInViewport(gameObjects, viewport, game);
	});
}

function drawFrameInViewport(gameObjects, viewport, game) {
	clearCanvasContext(game.context, viewport);
	drawCurrentRoomBackgroundInViewport(game.context, viewport);

	gameObjects.filter(gameObject => isGameObjectVisibleInViewport(gameObject, viewport)).forEach(gameObject => {
		renderGameObjectInViewport(gameObject, viewport, game)
	});
}

function clearCanvasContext(context, viewport) {
	context.clearRect(viewport.origin.x, viewport.origin.y, viewport.size.width, viewport.size.height);
}

function drawCurrentRoomBackgroundInViewport(context, viewport) {
	let currentRoom = getCurrentRoom();

	context.fillStyle = currentRoom.backgroundColor;
	context.fillRect(
		viewport.origin.x,
		viewport.origin.y,
		viewport.size.width,
		viewport.size.height,
	);
}

function renderGameObjectInViewport(gameObject, viewport, game) {
	let {sprite, position} = gameObject.components;

	let spriteAsset = getSpriteWithId(sprite.assetId);
	let currentSpriteFrame = getSpriteFrameWithId(spriteAsset.spriteFrames[sprite.currentFrameIndex]);

	let drawPosition = {
		x: (position.x + spriteAsset.offset.x) - (viewport.position.x - viewport.origin.x),
		y: (position.y + spriteAsset.offset.y) - (viewport.position.y - viewport.origin.y),
	};

	game.context.drawImage(
		getImageFromFilePath(currentSpriteFrame.imageFilePath),
		currentSpriteFrame.origin.x, currentSpriteFrame.origin.y,
		currentSpriteFrame.size.width, currentSpriteFrame.size.height,
		drawPosition.x, drawPosition.y,
		currentSpriteFrame.size.width, currentSpriteFrame.size.height
	);
}

function isGameObjectVisibleInViewport(gameObject, viewport) {
	let {sprite, position} = gameObject.components;

	let spriteAsset = getSpriteWithId(sprite.assetId);
	let currentSpriteFrame = getSpriteFrameWithId(spriteAsset.spriteFrames[sprite.currentFrameIndex]);

	let visibleBoundingBox = {
		x: position.x + spriteAsset.offset.x,
		y: position.y + spriteAsset.offset.y,
		width: currentSpriteFrame.size.width,
		height: currentSpriteFrame.size.height,
	}

	return visibleBoundingBox.x < viewport.position.x + viewport.size.width
		&& visibleBoundingBox.y < viewport.position.y + viewport.size.height
		&& visibleBoundingBox.x + visibleBoundingBox.width > viewport.position.x
		&& visibleBoundingBox.y + visibleBoundingBox.height > viewport.position.y;
}
