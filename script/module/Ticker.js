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
	for (let scheduledItem of schedule.slice(0)) {
		if (scheduledItem.time === 0) {
			await scheduledItem.action();
			schedule.splice(schedule.indexOf(scheduledItem), 1);
		} else {
			scheduledItem.time -= 1;
		}
	}

	tick(schedule);
}
