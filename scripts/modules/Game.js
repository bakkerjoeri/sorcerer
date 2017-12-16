import PubSub from './../core/PubSub';
import Log from './../modules/Log';

export default class Game {
	start() {
		this.turnOrder = [];
		this.takeTurns();
	}

	setCurrentMap(map) {
		this.map = map;
	}

	setPlayer(playerEntity) {
		this.player = playerEntity;
	}

	takeTurns() {
		Promise.all(this.map.actors.map((actor) => {
			return actor.takeTurn();
		})).then(this.takeTurns.bind(this));
	}
}
