export const REPLACE_STATE = 'REPLACE_STATE';
export function replaceState(newState) {
	return {
		type: REPLACE_STATE,
		newState,
	};
}
