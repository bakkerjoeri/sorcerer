import Entity from './../core/Entity';

export default class Structure extends Entity {
	constructor(structureDefinition, options) {
		super(options);
		this.applyStructureDefinition(structureDefinition);
	}

	applyStructureDefinition(structureDefinition) {
		this.type = structureDefinition.type;
		this.useSpriteWithName(structureDefinition.spriteName);
		this.setMapSize(structureDefinition.size);
		this.setSolidity(structureDefinition.solid);
		this.setCanBeAttacked(structureDefinition.canBeAttacked);
	}

	setCanBeAttacked(canBeAttacked = false) {
		this.canBeAttacked = canBeAttacked;
	}

	updateMapPosition(mapPosition) {
		this.mapPosition = mapPosition;
		this.position = {
			x: mapPosition.x * 16,
			y: mapPosition.y * 16,
		};
	}

	setMapSize(mapSize) {
		this.mapSize = mapSize;
		this.size = {
			width: mapSize.width * 16,
			height: mapSize.height * 16,
		};
	}
}
