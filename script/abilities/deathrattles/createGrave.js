import Grave from './../../gameObjects/structures/Grave.js';
import {createGameObjectAtPositionInLevel} from './../../module/Level.js';

export default function createGrave(state, levelId, entity) {
	let {positionInLevel} = entity.components;

	return createGameObjectAtPositionInLevel(state, levelId, positionInLevel, Grave);
}
