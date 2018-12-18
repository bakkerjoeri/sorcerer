import System from './../library/core/module/System.js';

export default class AttackSystem extends System {
	constructor(game) {
		super(game);

		this.onEvent('attackTarget', this.attackTarget.bind(this));
	}

	attackTarget(attackEvent) {
		let damageEvent = {
			attacker: attackEvent.attacker,
			target: attackEvent.target,
			amount: attackEvent.attacker.components.baseAttack,
			types: [],
		};

		this.game.emitEventViaSystems('beforeDealDamage', damageEvent);
		this.game.emitEventViaSystems('dealDamage', damageEvent);
	}
}
