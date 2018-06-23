import gameStateStore from './../model/gameStateStore';
import {getAllEntities} from './../model/entities';

export default class World {
	constructor(systems = []) {
		this.systems = systems;
	}

	update() {
		this.systems.forEach((system) => {
			system.update(getAllEntities(gameStateStore.getState()));
		});
	}
}
