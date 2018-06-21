export default function createStore(initialState) {
	let isDispatching = false;
	let currentState = initialState;

	function dispatch(action) {
		if (isDispatching) {
			throw new Error('Cannot dispatch another action while already executing an action.');
		}

		try {
			console.log('Dispatching action...');
			isDispatching = true;
			currentState = action(currentState);
			console.log('Next state', currentState);
		} finally {
			isDispatching = false;
		}

		return action;
	}

	function getState() {
		if (isDispatching) {
			throw new Error('Cannot give current state while executing an action.');
		}

		return currentState;
	}

	return {
		dispatch,
		getState,
	};
}
