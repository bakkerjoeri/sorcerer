import Entity from './../core/Entity';
import Log from './../module/Log';

const STATS_DEFAULT = {
	strength: 1,
	maxHealth: 1,
	moveCost: 100,
	attackCost: 100,
}

export default class Actor extends Entity {
	constructor(creatureDefinition, options) {
		super(options);

		this.energy = 0;
		this.applyCreatureDefinition(creatureDefinition);
	}

	applyCreatureDefinition(creatureDefinition) {
		this.type = creatureDefinition.type;
		this.applyStats(creatureDefinition.stats);
		this.useSpriteWithName(creatureDefinition.spriteName);
		this.setSizeInLevel(creatureDefinition.size);
		this.setSolidity(creatureDefinition.solid);
		this.setDeathrattle(creatureDefinition.deathrattle);
	}

	applyStats(stats) {
		this.stats = Object.assign({}, STATS_DEFAULT, stats);

		if (this.health === undefined || this.health > this.stats.maxHealth) {
			this.health = this.stats.maxHealth;
		}
	}

	setDeathrattle(deathrattle) {
		if (typeof deathrattle === 'function') {
			this.deathrattle = deathrattle.bind(this);
		}
	}

	takeAction() {
		return new Promise((resolve) => {
			resolve();
		});
	}

	bumpInto(target) {
		if (target.canBeAttacked()) {
			Log.showMessage(`<em>${this.type}</em> attacks <em>${target.type}</em>`);

			this.attackTarget(target);

			return true;
		}

		return false;
	}

	attackTarget(target) {
		target.applyDamage(this.calculateAttackDamage());
		this.energy += this.stats.attackCost;
	}

	calculateAttackDamage() {
		return this.stats.strength;
	}

	applyDamage(damage) {
		Log.showMessage(`<em>${this.type}</em> takes ${damage} damage`);
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
			Log.showMessage(`<em>${this.type}</em> health max at ${this.health}`);
		} else if (health <= 0) {
			this.health = 0;
			this.die();
		} else {
			this.health = health;
			Log.showMessage(`<em>${this.type}</em> health is ${this.health}/${this.stats.maxHealth}`);
		}
	}

	moveTo(newLevelPosition) {
		if (!this.level.hasTileAtPosition(newLevelPosition)) {
			return false;
		}

		if (
			!this.level.hasSolidEntitiesInBoundaries(newLevelPosition, this.sizeInLevel, [this])
			&& this.level.areBoundariesWithinLevelBoundaries(newLevelPosition, this.sizeInLevel)
		) {
			this.level.moveActorFromPositionToPosition(this, this.positionInLevel, newLevelPosition);
			this.setPositionInLevel(newLevelPosition);

			this.energy += this.stats.moveCost;
			return true;
		}

		let solidActorsOnNewPosition = this.level.getSolidActorsInBoundaries(newLevelPosition, this.sizeInLevel, [this]);

		if (solidActorsOnNewPosition.length > 0) {
			let actionTaken = false;

			solidActorsOnNewPosition.forEach((solidActor) => {
				let bumpIntoResult = this.bumpInto(solidActor);

				if (bumpIntoResult) {
					actionTaken = true;
				}
			});

			return actionTaken;
		}

		return false;
	}

	moveUp() {
		return this.moveTo({
			x: this.positionInLevel.x,
			y: this.positionInLevel.y - 1
		});
	}

	moveRight() {
		return this.moveTo({
			x: this.positionInLevel.x + 1,
			y: this.positionInLevel.y
		});
	}

	moveDown() {
		return this.moveTo({
			x: this.positionInLevel.x,
			y: this.positionInLevel.y + 1
		});
	}

	moveLeft() {
		return this.moveTo({
			x: this.positionInLevel.x - 1,
			y: this.positionInLevel.y,
		});
	}

	canBeAttacked() {
		return !this.dead;
	}

	die() {
		this.dead = true;
		this.solid = false;
		delete this.sprite;

		if (typeof this.deathrattle === 'function') {
			this.deathrattle(this.level);
		}

		Log.showMessage(`<em>${this.type}</em> is dead`);
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
