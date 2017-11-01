import Entity from './../core/Entity';
import SpriteAtlas from './../core/SpriteAtlas';
import Log from './../modules/Log';

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

	moveTo(mapPosition) {
		if (this.map.hasTileAtPosition(mapPosition)) {
			let entitiesAtPosition = this.map.room.findSolidEntitiesInBoundaries({
				x: mapPosition.x * 16,
				y: mapPosition.y * 16,
				width: this.sprite.size.width,
				height: this.sprite.size.height,
			}, [this]);

			if (entitiesAtPosition.length === 0) {
				this.updateMapPosition(mapPosition);
				return true;
			} else if (entitiesAtPosition.length > 0) {
				let actionTaken = false;

				entitiesAtPosition.forEach((entity) => {
					let bumpIntoResult = this.bumpInto(entity);

					if (bumpIntoResult) {
						actionTaken = true;
					}
				});

				return actionTaken;
			}
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
		this.size = {
			width: 16,
			height: 16,
		}
		this.sprite = getDeadSprite();

		Log.showMessage(`<em>${this.type}</em> is dead`);
	}

	updateMapPosition(position) {
		this.mapPosition = position;
		this.updateRoomPositionWithMapPosition(this.mapPosition);
	}

	updateRoomPositionWithMapPosition(mapPosition) {
		this.roomPosition = {
			x: mapPosition.x * 16,
			y: mapPosition.y * 16,
		};
	}
}

function getDeadSprite() {
	let spriteAtlasDefinition = '{ "file": "assets/images/grave-sheet.png", "frames": [ { "name": "grave_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
	let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
	let graveSprite = spriteAtlas.createSpriteWithFrames([
		'grave_0',
	]);

	return graveSprite;
}
