export default class InterfaceManager {
	constructor(game) {
		this.game = game;

		window.addEventListener('keydown', (event) => {
			game.emitEvent('keydown', event.key);
		});

		window.addEventListener('keyup', (event) => {
			game.emitEvent('keyup', event.key);
		});
	}
}
