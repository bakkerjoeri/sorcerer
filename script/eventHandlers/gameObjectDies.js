import {setComponentForGameObject, removeComponentFromGameObject} from './../library/core/model/gameObjects.js';

export const makeGameObjectDies = emitEvent => (state, gameObject) => {
	return gameObjectDies(state, gameObject, emitEvent);
}

export default function gameObjectDies(state, gameObject, emitEvent) {
	let {name} = gameObject.components;

	emitEvent('log', state, `${name} dies!`);

	state = removeComponentFromGameObject(gameObject.id, 'isVisible')(state);
	state = removeComponentFromGameObject(gameObject.id, 'isSolid')(state);
	state = setComponentForGameObject(gameObject.id, 'isDead', true)(state);

	return state;
}
