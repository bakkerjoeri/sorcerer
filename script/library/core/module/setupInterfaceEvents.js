import {
	addActiveKeyboardKey,
	removeActiveKeyboardKey,
	resetActiveKeyboardKeys,
} from './../model/game.js';

import {
	getActiveViewportsInCurrentRoom
} from './../model/rooms.js';

export default function setupInterfaceEvents(game) {
	window.addEventListener('mousemove', (event) => {
		let state = game.store.getState();

		let viewports = getActiveViewportsInCurrentRoom(state);
		let canvasBounds = game.canvas.getBoundingClientRect();
		let positionInViewport = {
			x: Math.round(Math.min(Math.max(event.clientX - canvasBounds.left, 0), canvasBounds.width) / game.scale),
			y: Math.round(Math.min(Math.max(event.clientY - canvasBounds.top, 0), canvasBounds.height) / game.scale),
		};

		let viewportWithFocus = viewports.find((viewport) => {
			return positionInViewport.x >= viewport.origin.x &&
			positionInViewport.x <= viewport.origin.x + viewport.size.width &&
			positionInViewport.y >= viewport.origin.y &&
			positionInViewport.y <= viewport.origin.y + viewport.size.height;
		}) || viewports[0];

		const positionInGame = {
			x: Math.min(Math.max((positionInViewport.x + viewportWithFocus.position.x - viewportWithFocus.origin.x), viewportWithFocus.position.x), viewportWithFocus.position.x + viewportWithFocus.size.width),
			y: Math.min(Math.max((positionInViewport.y + viewportWithFocus.position.y - viewportWithFocus.origin.y), viewportWithFocus.position.y), viewportWithFocus.position.y + viewportWithFocus.size.height),
		};

		game.store.setState({
			...state,
			game: {
				...state.game,
				mousePosition: positionInGame,
				mouseViewportPosition: positionInViewport,
			},
		});
	});

	window.addEventListener('keydown', (event) => {
		if (!event.repeat) {
			const key = event.key.toLowerCase();

			game.store.dispatch(addActiveKeyboardKey(key));
			game.store.setState(game.emitEvent('keyDown', game.store.getState(), key));
		}
	});

	window.addEventListener('keyup', (event) => {
		const key = event.key.toLowerCase();

		game.store.dispatch(removeActiveKeyboardKey(key));
		game.store.setState(game.emitEvent('keyUp', game.store.getState(), key));
	});

	window.addEventListener('blur', () => {
		game.store.dispatch(resetActiveKeyboardKeys());
	});

	game.addEventHandler('update', (state) => {
		return state.game.activeKeyboardKeys.reduce((newState, pressedKey) => {
			return game.emitEvent('keyPressed', newState, pressedKey);
		}, state);
	});
}
