import {createEntity} from './../library/core/module/Entity';
import HealthComponent from './../component/HealthComponent';

export const ACTOR_ENTITY_COMPONENTS_BLUEPRINT = {
	actor: true,
	isSolid: true,
	position: {
		x: 0,
		y: 0,
	},
	positionInLevel: {
		x: 0,
		y: 0,
	},
	sizeInLevel: {
		width: 1,
		height: 1,
	},
	health: new HealthComponent({
		maximum: 1,
	}),
	actionTicker: {
		ticks: 0,
	},
};

export default function ActorEntity(components) {
	return createEntity({
		...ACTOR_ENTITY_COMPONENTS_BLUEPRINT,
		...components,
	})
};
