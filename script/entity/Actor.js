import Entity from './../core/Entity';
import Log from './../module/Log';

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
		this.setMapSize(creatureDefinition.size);
		this.setSolidity(creatureDefinition.solid);
		this.setDeathrattle(creatureDefinition.deathrattle);
	}

	applyStats(stats) {
		this.stats = Object.assign({}, STATS_DEFAULT, stats);
	}

	setDeathrattle(deathrattle) {
		if (typeof deathrattle === 'function') {
			this.deathrattle = deathrattle.bind(this);
		}
	}

	takeTurn() {
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

	moveTo(newMapPosition) {
		if (!this.map.hasTileAtPosition(newMapPosition)) {
			return false;
		}

		if (
			!this.map.hasSolidEntitiesInBoundaries(newMapPosition, this.mapSize, [this])
			&& this.map.areBoundariesWithinMapBoundaries(newMapPosition, this.mapSize)
		) {
			this.map.moveActorFromPositionToPosition(this, this.mapPosition, newMapPosition);
			this.updateMapPosition(newMapPosition);

			return true;
		}

		let solidActorsOnNewPosition = this.map.getSolidActorsInBoundaries(newMapPosition, this.mapSize, [this]);

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
			x: this.mapPosition.x,
			y: this.mapPosition.y - 1
		});
	}

	moveRight() {
		return this.moveTo({
			x: this.mapPosition.x + 1,
			y: this.mapPosition.y
		});
	}

	moveDown() {
		return this.moveTo({
			x: this.mapPosition.x,
			y: this.mapPosition.y + 1
		});
	}

	moveLeft() {
		return this.moveTo({
			x: this.mapPosition.x - 1,
			y: this.mapPosition.y,
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
			this.deathrattle(this.map);
		}

		Log.showMessage(`<em>${this.type}</em> is dead`);
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
