let state = {
	entities: {},
	entityCount: 0,
};
let events = {};

events = addEventHandler(events, 'addEntity', (state, entity) => {
	return {
		...state,
		entities: {
			...state.entities,
			[entity.id]: entity,
		},
	};
}, events);

events = addEventHandler('addEntity', (state) => {
	return {
		...state,
		entityCount: state.entityCount + 1,
	};
}, events);

console.log(events, state);

state = emitEventViaSystems('addEntity', events, state, {
	id: 1,
	player: true,
});

console.log(events, state);

function emitEventViaSystems(eventName, events, state, ...args) {
	if (!events.hasOwnProperty(eventName)) {
		return state;
	}

	return events[eventName].reduce((state, eventHandler) => {
		return eventHandler(state, ...args)
	}, state);
}

function addEventHandler(eventName, events, handler) {
	if (typeof handler !== 'function') {
		throw new Error(`Expected callback to be of type 'function', but got '${typeof callback}'.`)
	}

	if (!events.hasOwnProperty(eventName)) {
		events = {
			...events,
			[eventName]: [],
		}
	}

	events = {
		...events,
		[eventName]: [
			...events[eventName],
			handler,
		],
	};

	return events;
}
