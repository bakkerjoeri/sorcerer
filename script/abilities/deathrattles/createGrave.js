import Grave from './../../gameObject/Grave';
import {createGameObjectAtPositionInLevel} from './../../module/Level';

export default function createGrave(levelId, entity) {
	let {positionInLevel} = entity.components;
	createGameObjectAtPositionInLevel(levelId, positionInLevel, Grave);
}
