import {setComponentForGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects.js';
import {getAbilityWithName} from './../abilities/index.js';

export default function gameObjectDies(state, gameObject) {
	let {currentLevelId, deathrattle} = gameObject.components;

	state = removeComponentFromGameObject(gameObject.id, 'isVisible')(state);
	state = removeComponentFromGameObject(gameObject.id, 'isSolid')(state);
	state = setComponentForGameObject(gameObject.id, 'isDead', true)(state);

	if (deathrattle && currentLevelId) {
		state = getAbilityWithName(deathrattle)(state, currentLevelId, gameObject);
	}

	return state;
}
