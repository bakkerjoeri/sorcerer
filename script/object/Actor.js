import Entity from './Entity';
import Log from './../module/Log';
import Ticker from './../module/Ticker';

const DEFAULT_STATS = {
	strength: 1,
	maxHealth: 1,
	moveCost: 100,
	attackCost: 100,
}

export default class Actor extends Entity {
	constructor(creatureDefinition, options) {
		super(options);

		this.applyCreatureDefinition(creatureDefinition);

		Ticker.schedule(this.takeAction.bind(this), 0, this);
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
		this.stats = Object.assign({}, DEFAULT_STATS, stats);

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

	wait() {
		Ticker.schedule(this.takeAction.bind(this), this.stats.moveCost, this);
	}

	canMove() {
		let canMove = this.canMoveToPosition({x: this.positionInLevel.x + 1, y: this.positionInLevel.y})
			|| this.canMoveToPosition({x: this.positionInLevel.x, y: this.positionInLevel.y + 1})
			|| this.canMoveToPosition({x: this.positionInLevel.x - 1, y: this.positionInLevel.y})
			|| this.canMoveToPosition({x: this.positionInLevel.x, y: this.positionInLevel.y - 1});
		
		return canMove;
	}

	canMoveToPosition(levelPosition) {
		return this.level.hasTileAtPosition(levelPosition)
			&& !this.level.hasSolidEntitiesInBoundaries(levelPosition, this.sizeInLevel, [this])
			&& this.level.areBoundariesWithinLevelBoundaries(levelPosition, this.sizeInLevel);
	}

	moveTo(newLevelPosition) {
		this.level.moveActorFromPositionToPosition(this, this.positionInLevel, newLevelPosition);
		Ticker.schedule(this.takeAction.bind(this), this.stats.moveCost, this);

		return true;
	}

	canAttackPosition(levelPosition) {
		let solidActorsOnNewPosition = this.level.getSolidActorsInBoundaries(levelPosition, this.sizeInLevel, [this]);

		return solidActorsOnNewPosition.some((actor) => {
			return actor.canBeAttacked();
		});
	}

	attackPosition(levelPosition) {
		let targets = this.level.getSolidActorsInBoundaries(levelPosition, this.sizeInLevel, [this]).filter((actor) => {
			return actor.canBeAttacked();
		});

		if (targets.length === 0) {
			return false;
		}

		targets.forEach((target) => {
			this.attackTarget(target);
		});

		return true;
	}

	attackTarget(target) {
		Log.showMessage(`<em>${this.type}</em> attacks <em>${target.type}</em>`);
		target.applyDamage(this.calculateAttackDamage());
		Ticker.schedule(this.takeAction.bind(this), this.stats.attackCost, this);
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
}
