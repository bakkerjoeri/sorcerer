export default class Keyboard {
	constructor(game) {
		this.game = game;

		window.addEventListener('keydown', (event) => {
			game.notify('keydown', undefined, event.key);
		});

		window.addEventListener('keyup', (event) => {
			game.notify('keyup', undefined, event.key);
		});
	}
}
