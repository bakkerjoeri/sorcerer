import System from './../module/System.js';
import store from './../model/gameStateStore.js';
import {getCurrentRoom} from './../model/rooms.js';
import {getActiveViewportsInRoomWithId} from './../model/viewports.js';
import {getSpriteWithId} from './../model/sprites.js';
import {getSpriteFrameWithId} from './../model/spriteFrames.js';
import {getImageFromFilePath} from './../module/SpriteFrame.js';
import {doesGameObjectHaveComponents} from './../module/GameObject.js';

export default class RenderSystem extends System {
	constructor() {
		super(entity => doesGameObjectHaveComponents(entity, ['sprite', 'position', 'isVisible']));

		this.drawFrame = this.drawFrame.bind(this);
		this.drawFrameInViewport = this.drawFrameInViewport.bind(this);
		this.renderGameObjectInViewport = this.renderGameObjectInViewport.bind(this);

		this.observe('draw', this.drawFrame);
	}

	drawFrame(gameObjects) {
		let viewports = getActiveViewportsInRoomWithId(store.getState(), getCurrentRoom(store.getState()).id);

		viewports.forEach((viewport) => {
			this.drawFrameInViewport(gameObjects, viewport, this.game);
		});
	}

	drawFrameInViewport(gameObjects, viewport) {
		clearCanvasContext(this.game.context, viewport);
		drawCurrentRoomBackgroundInViewport(this.game.context, viewport);

		gameObjects.filter(gameObject => isGameObjectVisibleInViewport(gameObject, viewport)).forEach(gameObject => {
			this.renderGameObjectInViewport(gameObject, viewport)
		});
	}

	renderGameObjectInViewport(gameObject, viewport) {
		let {sprite, position} = gameObject.components;

		let spriteAsset = getSpriteWithId(store.getState(), sprite.assetId);
		let currentSpriteFrame = getSpriteFrameWithId(store.getState(), spriteAsset.spriteFrames[sprite.currentFrameIndex]);

		let drawPosition = {
			x: (position.x + spriteAsset.offset.x) - (viewport.position.x - viewport.origin.x),
			y: (position.y + spriteAsset.offset.y) - (viewport.position.y - viewport.origin.y),
		};

		this.game.context.drawImage(
			getImageFromFilePath(currentSpriteFrame.imageFilePath),
			currentSpriteFrame.origin.x, currentSpriteFrame.origin.y,
			currentSpriteFrame.size.width, currentSpriteFrame.size.height,
			drawPosition.x, drawPosition.y,
			currentSpriteFrame.size.width, currentSpriteFrame.size.height
		);
	}
}

function clearCanvasContext(context, viewport) {
	context.clearRect(viewport.origin.x, viewport.origin.y, viewport.size.width, viewport.size.height);
}

function drawCurrentRoomBackgroundInViewport(context, viewport) {
	let currentRoom = getCurrentRoom(store.getState());

	context.fillStyle = currentRoom.backgroundColor;
	context.fillRect(
		viewport.origin.x,
		viewport.origin.y,
		viewport.size.width,
		viewport.size.height,
	);
}

function isGameObjectVisibleInViewport(gameObject, viewport) {
	let {sprite, position} = gameObject.components;

	let spriteAsset = getSpriteWithId(store.getState(), sprite.assetId);
	let currentSpriteFrame = getSpriteFrameWithId(store.getState(), spriteAsset.spriteFrames[sprite.currentFrameIndex]);

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
