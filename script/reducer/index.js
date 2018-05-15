const DO_A_THING = 'DO_A_THING';

const initialState = {};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case DO_A_THING:
			return Object.assign({}, state, {
				test: 'lol',
			});
		default:
			return state;
	}
}
