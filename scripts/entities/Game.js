import PubSub from './../core/PubSub';

export default class Game {
	constructor(room) {
		this.room = room;

		this.player;
		this.nonPlayers = new Set();
		this.objects = new Set();

		PubSub.subscribe('playerTurnTaken', this.tick.bind(this));
	}

	tick() {
		console.log('tick...');
		this.performTurns();
	}

	setPlayer(playerEntity) {
		this.player = playerEntity;

		this.room.addEntity(playerEntity);
	}

	addNonPlayer(nonPlayerEntity) {
		this.nonPlayers.add(nonPlayerEntity);

		this.room.addEntity(nonPlayerEntity);
	}

	addObject(objectEntity) {
		this.objects.add(objectEntity);

		this.room.addEntity(objectEntity);
	}

	performTurns() {
		this.nonPlayers.forEach((nonPlayer) => {
			nonPlayer.takeTurn();
		});
	}
}
