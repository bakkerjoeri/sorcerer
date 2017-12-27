import PubSub from './../core/PubSub';
import Log from './../modules/Log';
import clone from 'lodash/clone';

export default class Game {
	start() {
		this.takeTurns();
	}

	setCurrentMap(map) {
		this.map = map;
	}

	setPlayer(playerEntity) {
		this.player = playerEntity;
	}

	async takeTurns() {
		for(let actor of this.getTurnOrder()) {
			await actor.takeTurn();
		}

		this.takeTurns();
	}

	getTurnOrder() {
		return clone(this.map.actors);
	}
}
