import combineReducers from './combineReducers';

export default function createStore(reducer) {
	let isDispatching = false;
	let currentReducer;
	let currentState;

	replaceReducer(reducer);

	function dispatch(action) {
		if (isDispatching) {
			throw new Error('Cannot dispatch another action while already executing an action.');
		}

		if (!action.type) {
			throw new Error('Cannot execute action that doesn\'t have a type.');
		}

		try {
			console.log(`Dispatching action ${action.type}`);
			isDispatching = true;
			currentState = currentReducer(currentState, action);
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

	function replaceReducer(reducer) {
		if (typeof reducer !== 'function') {
			throw new Error(`Expected the reducer to be a 'function', but received '${typeof reducer}'.`);
		}

		currentReducer = reducer;
	}

	function addReducers(...reducers) {
		replaceReducer(combineReducers(currentReducer, ...reducers));
	}

	dispatch({type: 'INIT'});

	return {
		dispatch,
		getState,
		replaceReducer,
		addReducers,
	};
}
