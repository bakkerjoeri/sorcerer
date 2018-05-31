import {updateViewportInRoom, drawViewportForRoomOntoContext} from './module/Viewport';
import gameStateStore from './store/gameStateStore';

export default class Room {
	constructor(size) {
		this.setSize(size);

		this.viewports = [];
		this.gameObjects = [];
	}

	step(time) {
		// Update each gameObject
		// This should happen before updating the viewport, otherwise the viewport
		// follows entity position changes a step after they change position,
		// while the new position is already rendered.
		this.gameObjects.forEach((gameObject) => {
			gameObject.step(time);
		});

		let viewports = Object.values(gameStateStore.getState().viewports);

		// update the viewports
		viewports.filter((viewport) => {
			return viewport.isActive;
		}).forEach((activeViewport) => {
			updateViewportInRoom(time, activeViewport, this);
		});
	}

	draw(time) {
		let viewports = Object.values(gameStateStore.getState().viewports);

		// draw each viewport
		viewports.filter((viewport) => {
			return viewport.isActive;
		}).forEach((activeViewport) => {
			drawViewportForRoomOntoContext(time, activeViewport, this, this.context);
		});
	}

	addViewport(viewport) {
		this.viewports.push(viewport);
		viewport.setRoom(this);
	}

	useCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}

	addGameObject(gameObject) {
		this.gameObjects.push(gameObject);
	}

	getEntities() {
		return this.gameObjects;
	}

	setSize(size) {
		this.size = size;
	}

	getSize() {
		return this.size;
	}

	setBackgroundColor(backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	getBackgroundColor() {
		return this.backgroundColor;
	}

	drawBackground(context, offset, size) {
		context.fillStyle = this.backgroundColor;
		context.fillRect(
			offset.x,
			offset.y,
			size.width,
			size.height,
		);

		context.strokeStyle = '#bad455';
		context.strokeRect(
			offset.x,
			offset.y,
			size.width,
			size.height,
		);
	}
}
