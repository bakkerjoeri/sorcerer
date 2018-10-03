import Grave from './../../gameObject/Grave.js';
import {createGameObjectAtPositionInLevel} from './../../module/Level.js';

export default function createGrave(levelId, entity) {
	let {positionInLevel} = entity.components;
	createGameObjectAtPositionInLevel(levelId, positionInLevel, Grave);
}
