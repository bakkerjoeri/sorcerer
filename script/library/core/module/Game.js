import {setGameName} from './../model/game.js';

export default class Game {
	constructor(store, name, canvas, options = {}) {
		this.store = store;
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.looping = false;
		this.update = this.update.bind(this);
		this.eventHandlers = new Map();

		this.setName(name);

		if (options.hasOwnProperty('scale')) {
			changeCanvasScale(this.canvas, options.scale);
		}

		this.emitEvent = this.emitEvent.bind(this);
	}

	setName(name) {
		this.store.dispatch(setGameName(name));
	}

	start() {
		this.looping = true;
		this.store.setState(this.emitEvent('init', this.store.getState(), this.currentTime));
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

	emitEvent(eventName, state, ...args) {
		if (!this.eventHandlers.has(eventName)) {
			return state;
		}

		return this.eventHandlers.get(eventName).reduce((newState, eventHandler) => {
			return eventHandler(newState, ...args)
		}, state);
	}

	update(time) {
		this.elapsedSincePreviousUpdate = time - this.currentTime;
		this.currentTime = time;

		this.store.setState(this.emitEvent('update', this.store.getState(), this.currentTime));
		this.store.setState(this.emitEvent('beforeDraw', this.store.getState(), this.currentTime));
		this.store.setState(this.emitEvent('draw', this.store.getState(), this.context, this.currentTime));

		if (this.looping) {
			window.requestAnimationFrame(this.update);
		}
	}
}

function changeCanvasScale(canvas, scale = 1) {
	let canvasBoundaries = canvas.getBoundingClientRect();

	canvas.width = canvasBoundaries.width / scale;
	canvas.height = canvasBoundaries.height / scale;
}
