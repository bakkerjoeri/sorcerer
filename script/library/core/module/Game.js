import store from './../model/gameStateStore.js';
import {getGameObjectsInCurrentRoom} from './../model/gameObjects.js';
import Keyboard from './Keyboard.js';

export default class Game {
	constructor(canvas, scale) {
		this.keyboard = new Keyboard(this);
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.systems = [];
		this.looping = false;
		this.update = this.update.bind(this);

		changeCanvasScale(canvas, scale);
	}

	start() {
		this.looping = true;

		window.requestAnimationFrame(this.update);
	}

	stop() {
		this.looping = false;
	}

	emitEvent(eventName, entities = getGameObjectsInCurrentRoom(store.getState()), ...args) {
		this.systems.forEach((system) => {
			system.handleEvent(eventName, entities, ...args);
		});
	}

	update(time) {
		this.timeSincePreviousUpdate = time - this.elapsed;
		this.elapsed = time;

		this.emitEvent('update');
		this.emitEvent('draw');

		if (this.looping) {
			window.requestAnimationFrame(this.update);
		}
	}

	addSystem(system) {
		this.systems = [
			...this.systems,
			system,
		];

		system.game = this;
	}

	removeSystem(system) {
		this.systems = [
			...this.systems.slice(0, this.systems.indexOf(system)),
			...this.systems.slice(this.systems.indexOf(system) + 1)
		]

		delete system.game;
	}
}

function changeCanvasScale(canvas, scale = 1) {
	let canvasBoundaries = canvas.getBoundingClientRect();

	canvas.width = canvasBoundaries.width / scale;
	canvas.height = canvasBoundaries.height / scale;
}
