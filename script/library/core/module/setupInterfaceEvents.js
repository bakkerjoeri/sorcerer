export default function setupInterfaceEvents(game) {
	window.addEventListener('keydown', (event) => {
		game.emitEventViaSystems('keydown', event.key);
	});

	window.addEventListener('keyup', (event) => {
		game.emitEventViaSystems('keyup', event.key);
	});
}
