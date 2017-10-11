import Entity from './../core/Entity';

const STATS_DEFAULT = {
	strength: 1,
	maxHealth: 1,
}

export default class Actor extends Entity {
	constructor (creatureDefinition, options) {
		super(options);
		this.applyCreatureDefinition(creatureDefinition);

		this.health = this.stats.maxHealth;
	}

	applyCreatureDefinition(creatureDefinition) {
		this.type = creatureDefinition.type;
		this.applyStats(creatureDefinition.stats);
		this.setSprite(creatureDefinition.sprite);
		this.setSize(creatureDefinition.size);
		this.setSolidity(creatureDefinition.solid);
	}

	applyStats(stats) {
		this.stats = Object.assign({}, STATS_DEFAULT, stats);
	}

	bumpInto(target) {
		if (target.canBeAttacked()) {
			console.log(`${this.type} attacks ${target.type}`);

			this.attackTarget(target);
		}
	}

	attackTarget(target) {
		target.applyDamage(this.calculateAttackDamage());
	}

	calculateAttackDamage() {
		return this.stats.strength;
	}

	applyDamage(damage) {
		console.log(`${this.type} takes ${damage} damage`);

		this.reduceHealth(damage);
	}

	restoreHealth(amount) {
		this.changeHealth(this.health + amount);
	}

	reduceHealth(amount) {
		this.changeHealth(this.health - amount);
	}

	changeHealth(health) {
		if (health > this.stats.maxHealth) {
			this.health = this.stats.maxHealth;
		} else if (health < 0) {
			this.health = 0;
			this.die();
		} else {
			this.health = health;
		}

		console.log(`${this.type} health now ${this.health}`);
	}

	moveTo(position) {
		let entitiesAtPosition = this.room.findSolidEntitiesInBoundaries({
			x: position.x,
			y: position.y,
			width: this.sprite.size.width,
			height: this.sprite.size.height,
		}, [this]);

		if (entitiesAtPosition.length === 0) {
			this.setPosition(position);
		} else if (entitiesAtPosition.length > 0) {
			entitiesAtPosition.forEach((entity) => {
				return this.bumpInto(entity);
			});
		}

		return true;
	}

	moveUp() {
		return this.moveTo({
			x: this.position.x,
			y: this.position.y - 16
		});
	}

	moveRight() {
		return this.moveTo({
			x: this.position.x + 16,
			y: this.position.y
		});
	}

	moveDown() {
		return this.moveTo({
			x: this.position.x,
			y: this.position.y + 16
		});
	}

	moveLeft() {
		return this.moveTo({
			x: this.position.x - 16,
			y: this.position.y
		});
	}

	canBeAttacked() {
		return true;
	}

	die() {
		this.dead = true;
		this.solid = false;
		delete this.sprite;
	}
}