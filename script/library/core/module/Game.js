import {setGameName, setCurrentRoomId} from './../model/game.js';

export default class Game {
	constructor(store, name, canvas, options = {}) {
		this.store = store;
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.systems = [];
		this.looping = false;
		this.update = this.update.bind(this);
		this.eventHandlers = new Map();

		this.setName(name);

		if (options.hasOwnProperty('scale')) {
			changeCanvasScale(this.canvas, options.scale);
		}
	}

	setName(name) {
		this.store.dispatch(setGameName(name));
	}

	setCurrentRoom(roomId) {
		this.store.dispatch(setCurrentRoomId(roomId));
	}

	start() {
		this.looping = true;

		window.requestAnimationFrame(this.update);
	}

	stop() {
		this.looping = false;
	}

	addEventHandler(eventName, handler) {
		if (typeof handler !== 'function') {
			throw new Error(`Expected handler to be of type 'function', but got '${typeof handler}'.`)
		}

		if (!this.eventHandlers.has(eventName)) {
			this.eventHandlers.set(eventName, []);
		}

		this.eventHandlers.get(eventName).push(handler);
	}

	emitEventViaSystems(eventName, ...args) {
		this.systems.forEach((system) => {
			system.handleEvent(eventName, ...args);
		});
	}

	emitEvent(eventName, ...args) {
		let state = this.store.getState();

		if (!this.eventHandlers.has(eventName)) {
			return state;
		}

		let newState = this.eventHandlers.get(eventName).reduce((state, eventHandler) => {
			return eventHandler(state, ...args)
		}, state);

		this.store.setState(newState);
	}

	update(time) {
		this.timeSincePreviousUpdate = time - this.elapsed;
		this.elapsed = time;

		this.emitEvent('update');
		this.emitEventViaSystems('update');
		this.emitEvent('beforeDraw');
		this.emitEventViaSystems('beforeDraw');
		this.emitEvent('draw');
		this.emitEventViaSystems('draw');

		if (this.looping) {
			window.requestAnimationFrame(this.update);
		}
	}

	addSystem(system) {
		this.systems = [
			...this.systems,
			system,
		];
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
