import PubSub from './../core/PubSub';
import Log from './../modules/Log';

export default class Game {
	constructor() {
		this.player;

		PubSub.subscribe('playerTurnTaken', this.tick.bind(this));
	}

	tick() {
		this.performNonPlayerTurns();
	}

	setCurrentMap(map) {
		this.map = map;
	}

	setPlayer(playerEntity) {
		this.player = playerEntity;
	}

	performNonPlayerTurns() {
		this.map.actors.forEach((actor) => {
			if (actor !== this.player) {
				actor.takeTurn();
			}
		});
	}
}
