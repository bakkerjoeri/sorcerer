export default function createStore(initialState, debugMode = false) {
	let isDispatching = false;
	let currentState = initialState;

	function setState(newState) {
		currentState = newState;
	}

	function dispatch(action) {
		if (isDispatching) {
			throw new Error('Cannot dispatch another action while already executing an action.');
		}

		try {
			if (debugMode) {
				console.log('Dispatching action...');
			}

			isDispatching = true;
			setState(action(currentState));

			if (debugMode) {
				console.log('Next state', currentState);
			}
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
		setState,
		dispatch,
		getState,
	};
}
