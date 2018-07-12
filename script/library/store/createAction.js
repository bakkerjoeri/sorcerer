export default function createAction(store, reducer) {
	return store.dispatch(reducer);
}
