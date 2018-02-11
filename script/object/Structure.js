import Entity from './Entity';

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
}
