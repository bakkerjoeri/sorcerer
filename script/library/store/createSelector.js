export default function createSelector(store, selector) {
	return selector(store.getState());
}
