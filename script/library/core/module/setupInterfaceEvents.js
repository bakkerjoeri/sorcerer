export default function setupInterfaceEvents(game) {
	window.addEventListener('keydown', (event) => {
		game.emitEvent('keydown', event.key);
	});

	window.addEventListener('keyup', (event) => {
		game.emitEvent('keyup', event.key);
	});
}
