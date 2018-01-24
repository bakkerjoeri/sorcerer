import PubSub from 'core/PubSub';
import Log from 'module/Log';

export default class Game {
	constructor(options = {}) {
		this.room = options.room;
		this.level = options.level;
	}

	start() {
		if (!this.level) {
			throw new Error('Cannot start without a level.');
		}

		window.requestAnimationFrame(this.loop.bind(this));
		tick(this.level.actors);
	}

	loop(time) {
		if (!this.room) {
			throw new Error('Cannot start updating without a room.');
		}

		this.room.step(time);
		this.room.draw(time);

		window.requestAnimationFrame(this.loop.bind(this));
	}
}

async function tick(actors) {
	// console.log('New turn order:');
	// actors.forEach((actor, index) => {
	// 	console.log(`${index} ${actor.type}: ${actor.energy}`);
	// });

	let participatingActors = actors.filter((actor) => {
		return !actor.dead;
	});

	// console.log(`${participatingActors[0].type}'s time to do something...`);
	let actor = participatingActors.shift();
	await actor.takeAction();
	participatingActors = placeActorInOrder(actor, participatingActors);

	// TODO: Prevent maximum call stack overflow if there is no interrupting turn.
	tick(participatingActors);
}

function placeActorInOrder(actorToPlace, actors) {
	if (actors.length > 0) {
		console.log('Current turn order:');
		actors.forEach((actor, index) => {
			console.log(`${index} ${actor.type}: ${actor.energy}`);
		});
		console.log('');
		console.log('Let\'s compare');
		for (let index = 0; index < actors.length; index = index + 1) {
			console.log(`Comparing ${actorToPlace.type} (${actorToPlace.energy}) with ${actors[index].type} (${actors[index].energy})...`);
			if (actors[index].energy > actorToPlace.energy) {
				console.log(`Placing ${actorToPlace.type} at ${index} (found from front)`);
				actors.splice(index, 0, actorToPlace);
				break;
			}

			console.log(`Comparing ${actorToPlace.type} (${actorToPlace.energy}) with ${actors[actors.length - index - 1].type} (${actors[actors.length - index - 1].energy})...`);
			if (actors[actors.length - index - 1].energy <= actorToPlace.energy) {
				console.log(`Placing ${actorToPlace.type} at ${actors.length - index} (found from back)`);
				actors.splice(actors.length - index, 0, actorToPlace);
				break;
			}
		}
	} else {
		console.log(`No one else in queue, placing ${actorToPlace.type}`);
		actors.push(actorToPlace);
	}


	console.log('');
	console.log('New turn order:');
	actors.forEach((actor, index) => {
		console.log(`${index} ${actor.type}: ${actor.energy}`);
	});
	console.log('');
	return actors;
}
