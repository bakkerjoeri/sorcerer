import GameObject from './GameObject.js';

export default class Structure extends GameObject {
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

	setCanBeAttacked(attackable = false) {
		this.attackable = attackable;
	}
	
	canBeAttacked() {
		return this.attackable;
	}
}
