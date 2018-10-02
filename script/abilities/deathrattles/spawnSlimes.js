import Slime from './../../gameObject/Slime.js';
import {getPositionsInRangeInLevel, createGameObjectAtPositionInLevel} from './../../module/Level.js';

export default function spawnSlimes(levelId, entity) {
	let {positionInLevel, sizeInLevel} = entity.components;

	getPositionsInRangeInLevel(levelId, positionInLevel, sizeInLevel).forEach((position) => {
		createGameObjectAtPositionInLevel(levelId, position, Slime, {nonPlayer: true});
	})
}
