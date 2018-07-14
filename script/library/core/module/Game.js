import {getGameObjectsInCurrentRoom} from './../model/gameObjects';

let canvas;
let context;

export default class Game {
	constructor(canvas, scale) {
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

	update(time) {
		this.timeSincePreviousUpdate = time - this.elapsed;
		this.elapsed = time;

		this.systems.forEach((system) => {
			system.update(getGameObjectsInCurrentRoom());
		});

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
