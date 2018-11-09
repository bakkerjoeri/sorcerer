export default class Keyboard {
	constructor(game) {
		this.game = game;

		window.addEventListener('keydown', (event) => {
			game.emitEvent('keydown', undefined, event.key);
		});

		window.addEventListener('keyup', (event) => {
			game.emitEvent('keyup', undefined, event.key);
		});
	}
}
