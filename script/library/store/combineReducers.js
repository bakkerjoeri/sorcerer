export default function combineReducers(...reducers) {
	return (previousState, action) => {
		return reducers.reduce(
			(newState, reducer) => reducer(newState, action),
			previousState
		);
	}
}
