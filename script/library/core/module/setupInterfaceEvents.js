import {
	addActiveKeyboardKey,
	removeActiveKeyboardKey,
	resetActiveKeyboardKeys,
} from './../model/game.js';

export default function setupInterfaceEvents(game) {
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
