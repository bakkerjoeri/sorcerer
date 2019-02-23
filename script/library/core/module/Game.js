import {setGameName} from './../model/game.js';

export default class Game {
	constructor(store, name, canvas, options = {}) {
		this.store = store;
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.looping = false;
		this.update = this.update.bind(this);
		this.eventHandlers = new Map();
		this.scenes = new Map();
		this.initializedScenes = [];
		this.currentSceneName = '';

		this.setName(name);

		this.scale = options.scale || 1;
		changeCanvasScale(this.canvas, this.scale);

		this.emitEvent = this.emitEvent.bind(this);
		this.addEventHandler = this.addEventHandler.bind(this);
		this.removeEventHandler = this.removeEventHandler.bind(this);
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

	addScene(sceneName, handlers) {
		this.scenes.set(sceneName, handlers);
	}

	startScene(sceneName) {
		if (this.scenes.has(sceneName)) {
			if (this.currentSceneName) {
				this.unloadScene(this.currentSceneName);
			}

			forEachHandlerInScene(
				this.scenes.get(sceneName),
				this.addEventHandler,
			);

			if (!this.initializedScenes.includes(sceneName)) {
				this.initializedScenes = [
					...this.initializedScenes,
					sceneName,
				];

				this.store.setState(this.emitEvent(`initScene:${sceneName}`, this.store.getState(), sceneName));
			}

			this.store.setState(this.emitEvent(`enterScene:${sceneName}`, this.store.getState(), sceneName));
		}
	}

	unloadScene(sceneName) {
		this.store.setState(this.emitEvent(`leaveScene:${sceneName}`, this.store.getState(), sceneName));

		forEachHandlerInScene(
			this.scenes.get(sceneName),
			this.removeEventHandler,
		);
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

	removeEventHandler(eventName, handlerToRemove) {
		if (this.eventHandlers.has(eventName)) {
			this.eventHandlers.set(
				eventName,
				this.eventHandlers.get(eventName).reduce((handlers, handler) => {
					if (handler === handlerToRemove) {
						return handlers;
					}

					return [
						...handlers,
						handler,
					];
				}, [])
			);
		}
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

function forEachHandlerInScene(scene, callback) {
	Object.keys(scene).forEach((eventName) => {
		if (Array.isArray(scene[eventName])) {
			scene[eventName].forEach((handler) => {
				callback(eventName, handler);
			})
		} else {
			callback(eventName, scene[eventName]);
		}
	});
}
