export default function setupInterfaceEvents(game) {
	window.addEventListener('keydown', (event) => {
		game.store.setState(game.emitEvent('keydown', game.store.getState(), event.key));
	});

	window.addEventListener('keyup', (event) => {
		game.store.setState(game.emitEvent('keyup', game.store.getState(), event.key));
	});
}
