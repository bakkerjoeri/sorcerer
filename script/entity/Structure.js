import Entity from './../core/Entity';

export default class Structure extends Entity {
	constructor(structureDefinition, options) {
		super(options);

		this.applyStructureDefinition(structureDefinition);
	}

	applyStructureDefinition(structureDefinition) {
		this.type = structureDefinition.type;
		this.useSpriteWithName(structureDefinition.spriteName);
		this.setSizeInLevel(structureDefinition.size);
		this.setSolidity(structureDefinition.solid);
		this.setCanBeAttacked(structureDefinition.canBeAttacked);
	}

	setCanBeAttacked(canBeAttacked = false) {
		this.canBeAttacked = canBeAttacked;
	}

	setPositionInLevel(positionInLevel) {
		this.positionInLevel = positionInLevel;
		this.position = {
			x: positionInLevel.x * 16,
			y: positionInLevel.y * 16,
		};
	}

	setSizeInLevel(sizeInLevel) {
		this.sizeInLevel = sizeInLevel;
		this.size = {
			width: sizeInLevel.width * 16,
			height: sizeInLevel.height * 16,
		};
	}
}
