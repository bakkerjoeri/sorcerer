import Entity from './../core/Entity';

export default class Structure extends Entity {
	constructor(structureDefinitionm, options) {
		super(options);
		this.applyStructureDefinition(structureDefinitionm);
	}

	applyStructureDefinition(structureDefinitionm) {
		this.type = structureDefinitionm.type;
		this.setSprite(structureDefinitionm.sprite);
		this.setSize(structureDefinitionm.size);
		this.setSolidity(structureDefinitionm.solid);
		this.setCanBeAttacked(structureDefinitionm.canBeAttacked);
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
}
