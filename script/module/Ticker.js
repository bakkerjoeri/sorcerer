const scheduledActions = [];

export default class Ticker {
	static startTicking() {
		tick(scheduledActions);
	}

	static schedule(action, time) {
		scheduledActions.push({
			action: action,
			time: time,
		});
	}

	static unschedule(action) {
		scheduledActions.splice(scheduledActions.indexOf(action), 1);
	}
}

async function tick(schedule) {
	// We check all items from a clone of the schedule, so any mutations that happen
	// during the executed actions don't mess up the loop order.
	for (let scheduledItem of schedule.slice(0)) {
		if (scheduledItem.time === 0) {
			await scheduledItem.action();
			schedule.splice(schedule.indexOf(scheduledItem), 1);
		}
	}

	// Reduce the time of all items currently in the schedule with 1.
	schedule.forEach((scheduledItem) => {
		scheduledItem.time = scheduledItem.time - 1;
	});

	tick(schedule);
}
