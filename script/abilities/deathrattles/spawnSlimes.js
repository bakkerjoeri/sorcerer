import Slime from './../../gameObject/Slime';
import {getPositionsInRangeInLevel, createGameObjectAtPositionInLevel} from './../../module/Level';

export default function spawnSlimes(levelId, entity) {
	let {positionInLevel, sizeInLevel} = entity.components;

	getPositionsInRangeInLevel(levelId, positionInLevel, sizeInLevel).forEach((position) => {
		createGameObjectAtPositionInLevel(levelId, position, Slime, {nonPlayer: true});
	})
}
