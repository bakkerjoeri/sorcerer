import System from './../library/core/module/System.js';
import store from './../library/core/model/gameStateStore.js';
import {setComponentForGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects.js';
import {getAbilityWithName} from './../abilities/index.js';

export default class DamageSystem extends System {
	constructor(game) {
		super(game);

		this.onEvent('death', this.die.bind(this));
	}

	die(gameObject) {
		let {currentLevelId, name, deathrattle} = gameObject.components;

		this.game.emitEventViaSystems('log', `${name} dies!`);

		store.dispatch(removeComponentFromGameObject(gameObject.id, 'isVisible'));
		store.dispatch(removeComponentFromGameObject(gameObject.id, 'isSolid'));
		store.dispatch(setComponentForGameObject(gameObject.id, 'isDead', true));

		if (deathrattle && currentLevelId) {
			getAbilityWithName(deathrattle)(currentLevelId, gameObject);
		}
	}
}

export function die(state, gameObject) {
	let {currentLevelId, deathrattle} = gameObject.components;

	state = removeComponentFromGameObject(gameObject.id, 'isVisible')(state);
	state = removeComponentFromGameObject(gameObject.id, 'isSolid')(state);
	state = setComponentForGameObject(gameObject.id, 'isDead', true)(state);

	if (deathrattle && currentLevelId) {
		state = getAbilityWithName(deathrattle)(state, currentLevelId, gameObject);
	}

	return state;
}
