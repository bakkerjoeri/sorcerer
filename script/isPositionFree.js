import gameStateStore from './library/core/model/gameStateStore';
import {getEntitiesWithComponentNames} from './library/core/model/entities';

export default function isPositionFree(position) {
	let entitiesWithPosition = getEntitiesWithComponentNames(gameStateStore.getState(), ['position', 'isSolid']);

	return !entitiesWithPosition.some((entity) => {
		return entity.components.position.x === position.x && entity.components.position.y === position.y;
	});
}
