const scheduledEvents = [];

export default class Ticker {
	static startTicking() {
		tick(scheduledEvents);
	}

	static schedule(actor) {
		placeEventInSchedule(actor, scheduledEvents);
	}

	static unschedule(actor) {

	}
}

async function tick(schedule) {
	let actor = schedule.shift();
	await actor.takeAction();
	schedule = placeEventInSchedule(actor, schedule);

	tick(schedule);
}

function placeEventInSchedule(actorToPlace, actors) {
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
	console.log('-----------------------------');

	return actors;
}
